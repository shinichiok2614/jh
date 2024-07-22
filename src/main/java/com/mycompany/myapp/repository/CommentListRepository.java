package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.CommentList;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the CommentList entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CommentListRepository extends JpaRepository<CommentList, Long> {}
