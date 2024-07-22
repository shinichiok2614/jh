package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.CommentList;
import com.mycompany.myapp.repository.CommentListRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.CommentList}.
 */
@RestController
@RequestMapping("/api/comment-lists")
@Transactional
public class CommentListResource {

    private static final Logger log = LoggerFactory.getLogger(CommentListResource.class);

    private static final String ENTITY_NAME = "commentList";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CommentListRepository commentListRepository;

    public CommentListResource(CommentListRepository commentListRepository) {
        this.commentListRepository = commentListRepository;
    }

    /**
     * {@code POST  /comment-lists} : Create a new commentList.
     *
     * @param commentList the commentList to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new commentList, or with status {@code 400 (Bad Request)} if the commentList has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<CommentList> createCommentList(@Valid @RequestBody CommentList commentList) throws URISyntaxException {
        log.debug("REST request to save CommentList : {}", commentList);
        if (commentList.getId() != null) {
            throw new BadRequestAlertException("A new commentList cannot already have an ID", ENTITY_NAME, "idexists");
        }
        commentList = commentListRepository.save(commentList);
        return ResponseEntity.created(new URI("/api/comment-lists/" + commentList.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, commentList.getId().toString()))
            .body(commentList);
    }

    /**
     * {@code PUT  /comment-lists/:id} : Updates an existing commentList.
     *
     * @param id the id of the commentList to save.
     * @param commentList the commentList to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated commentList,
     * or with status {@code 400 (Bad Request)} if the commentList is not valid,
     * or with status {@code 500 (Internal Server Error)} if the commentList couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<CommentList> updateCommentList(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody CommentList commentList
    ) throws URISyntaxException {
        log.debug("REST request to update CommentList : {}, {}", id, commentList);
        if (commentList.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, commentList.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!commentListRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        commentList = commentListRepository.save(commentList);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, commentList.getId().toString()))
            .body(commentList);
    }

    /**
     * {@code PATCH  /comment-lists/:id} : Partial updates given fields of an existing commentList, field will ignore if it is null
     *
     * @param id the id of the commentList to save.
     * @param commentList the commentList to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated commentList,
     * or with status {@code 400 (Bad Request)} if the commentList is not valid,
     * or with status {@code 404 (Not Found)} if the commentList is not found,
     * or with status {@code 500 (Internal Server Error)} if the commentList couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<CommentList> partialUpdateCommentList(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody CommentList commentList
    ) throws URISyntaxException {
        log.debug("REST request to partial update CommentList partially : {}, {}", id, commentList);
        if (commentList.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, commentList.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!commentListRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CommentList> result = commentListRepository
            .findById(commentList.getId())
            .map(existingCommentList -> {
                if (commentList.getName() != null) {
                    existingCommentList.setName(commentList.getName());
                }
                if (commentList.getCreatedAt() != null) {
                    existingCommentList.setCreatedAt(commentList.getCreatedAt());
                }

                return existingCommentList;
            })
            .map(commentListRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, commentList.getId().toString())
        );
    }

    /**
     * {@code GET  /comment-lists} : get all the commentLists.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of commentLists in body.
     */
    @GetMapping("")
    public List<CommentList> getAllCommentLists() {
        log.debug("REST request to get all CommentLists");
        return commentListRepository.findAll();
    }

    /**
     * {@code GET  /comment-lists/:id} : get the "id" commentList.
     *
     * @param id the id of the commentList to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the commentList, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<CommentList> getCommentList(@PathVariable("id") Long id) {
        log.debug("REST request to get CommentList : {}", id);
        Optional<CommentList> commentList = commentListRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(commentList);
    }

    /**
     * {@code DELETE  /comment-lists/:id} : delete the "id" commentList.
     *
     * @param id the id of the commentList to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCommentList(@PathVariable("id") Long id) {
        log.debug("REST request to delete CommentList : {}", id);
        commentListRepository.deleteById(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
