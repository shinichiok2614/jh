package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.MessageList;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the MessageList entity.
 */
@Repository
public interface MessageListRepository extends JpaRepository<MessageList, Long> {
    default Optional<MessageList> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<MessageList> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<MessageList> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select messageList from MessageList messageList left join fetch messageList.author left join fetch messageList.receiver",
        countQuery = "select count(messageList) from MessageList messageList"
    )
    Page<MessageList> findAllWithToOneRelationships(Pageable pageable);

    @Query("select messageList from MessageList messageList left join fetch messageList.author left join fetch messageList.receiver")
    List<MessageList> findAllWithToOneRelationships();

    @Query(
        "select messageList from MessageList messageList left join fetch messageList.author left join fetch messageList.receiver where messageList.id =:id"
    )
    Optional<MessageList> findOneWithToOneRelationships(@Param("id") Long id);
}
