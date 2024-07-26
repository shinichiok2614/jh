package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Paragraph;
import com.mycompany.myapp.domain.Post;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Paragraph entity.
 */
@Repository
public interface ParagraphRepository extends JpaRepository<Paragraph, Long> {
    default Optional<Paragraph> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Paragraph> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Paragraph> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select paragraph from Paragraph paragraph left join fetch paragraph.post",
        countQuery = "select count(paragraph) from Paragraph paragraph"
    )
    Page<Paragraph> findAllWithToOneRelationships(Pageable pageable);

    @Query("select paragraph from Paragraph paragraph left join fetch paragraph.post")
    List<Paragraph> findAllWithToOneRelationships();

    @Query("select paragraph from Paragraph paragraph left join fetch paragraph.post where paragraph.id =:id")
    Optional<Paragraph> findOneWithToOneRelationships(@Param("id") Long id);

    List<Paragraph> findAllByPostId(Long postId);

    @Query("SELECT p FROM Paragraph p WHERE p.post.id = :postId ORDER BY p.post.id ASC")
    Optional<Paragraph> findFirstByPostIdOrderByOrderAsc(@Param("postId") Long postId);
}
