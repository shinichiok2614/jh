package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Post;
import com.mycompany.myapp.domain.Status;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Post entity.
 */
@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    default Optional<Post> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Post> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Post> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select post from Post post left join fetch post.category left join fetch post.person",
        countQuery = "select count(post) from Post post"
    )
    Page<Post> findAllWithToOneRelationships(Pageable pageable);

    @Query("select post from Post post left join fetch post.category left join fetch post.person")
    List<Post> findAllWithToOneRelationships();

    @Query("select post from Post post left join fetch post.category left join fetch post.person where post.id =:id")
    Optional<Post> findOneWithToOneRelationships(@Param("id") Long id);

    List<Post> findAllByPersonId(Long personId);

    List<Post> findAll();

    @Query("SELECT p FROM Post p WHERE p.category.id = :categoryId ORDER BY p.createdAt DESC")
    List<Post> findTop4ByCategoryIdOrderByCreatedAtDesc(@Param("categoryId") Long categoryId);

    @Query("SELECT p FROM Post p ORDER BY p.view DESC")
    List<Post> findTop4OrderByViewDesc();

    @Query("SELECT p FROM Post p WHERE p.category.id = :categoryId AND p.status = :status")
    // @Query("SELECT p FROM Post p WHERE p.category.id = :categoryId")
    List<Post> findAllByCategoryIdAndStatus(@Param("categoryId") Long categoryId, @Param("status") Status status);
}
