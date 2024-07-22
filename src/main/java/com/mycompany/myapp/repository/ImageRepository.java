package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Image;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Image entity.
 */
@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {
    default Optional<Image> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Image> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Image> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select image from Image image left join fetch image.album left join fetch image.paragraph",
        countQuery = "select count(image) from Image image"
    )
    Page<Image> findAllWithToOneRelationships(Pageable pageable);

    @Query("select image from Image image left join fetch image.album left join fetch image.paragraph")
    List<Image> findAllWithToOneRelationships();

    @Query("select image from Image image left join fetch image.album left join fetch image.paragraph where image.id =:id")
    Optional<Image> findOneWithToOneRelationships(@Param("id") Long id);

    List<Image> findAllByParagraphId(Long paragraphId);
}
