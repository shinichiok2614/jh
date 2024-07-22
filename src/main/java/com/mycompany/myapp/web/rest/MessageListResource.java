package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.MessageList;
import com.mycompany.myapp.repository.MessageListRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.MessageList}.
 */
@RestController
@RequestMapping("/api/message-lists")
@Transactional
public class MessageListResource {

    private static final Logger log = LoggerFactory.getLogger(MessageListResource.class);

    private static final String ENTITY_NAME = "messageList";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MessageListRepository messageListRepository;

    public MessageListResource(MessageListRepository messageListRepository) {
        this.messageListRepository = messageListRepository;
    }

    /**
     * {@code POST  /message-lists} : Create a new messageList.
     *
     * @param messageList the messageList to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new messageList, or with status {@code 400 (Bad Request)} if the messageList has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<MessageList> createMessageList(@RequestBody MessageList messageList) throws URISyntaxException {
        log.debug("REST request to save MessageList : {}", messageList);
        if (messageList.getId() != null) {
            throw new BadRequestAlertException("A new messageList cannot already have an ID", ENTITY_NAME, "idexists");
        }
        messageList = messageListRepository.save(messageList);
        return ResponseEntity.created(new URI("/api/message-lists/" + messageList.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, messageList.getId().toString()))
            .body(messageList);
    }

    /**
     * {@code PUT  /message-lists/:id} : Updates an existing messageList.
     *
     * @param id the id of the messageList to save.
     * @param messageList the messageList to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated messageList,
     * or with status {@code 400 (Bad Request)} if the messageList is not valid,
     * or with status {@code 500 (Internal Server Error)} if the messageList couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<MessageList> updateMessageList(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody MessageList messageList
    ) throws URISyntaxException {
        log.debug("REST request to update MessageList : {}, {}", id, messageList);
        if (messageList.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, messageList.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!messageListRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        messageList = messageListRepository.save(messageList);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, messageList.getId().toString()))
            .body(messageList);
    }

    /**
     * {@code PATCH  /message-lists/:id} : Partial updates given fields of an existing messageList, field will ignore if it is null
     *
     * @param id the id of the messageList to save.
     * @param messageList the messageList to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated messageList,
     * or with status {@code 400 (Bad Request)} if the messageList is not valid,
     * or with status {@code 404 (Not Found)} if the messageList is not found,
     * or with status {@code 500 (Internal Server Error)} if the messageList couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<MessageList> partialUpdateMessageList(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody MessageList messageList
    ) throws URISyntaxException {
        log.debug("REST request to partial update MessageList partially : {}, {}", id, messageList);
        if (messageList.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, messageList.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!messageListRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<MessageList> result = messageListRepository
            .findById(messageList.getId())
            .map(existingMessageList -> {
                if (messageList.getName() != null) {
                    existingMessageList.setName(messageList.getName());
                }
                if (messageList.getCreatedAt() != null) {
                    existingMessageList.setCreatedAt(messageList.getCreatedAt());
                }

                return existingMessageList;
            })
            .map(messageListRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, messageList.getId().toString())
        );
    }

    /**
     * {@code GET  /message-lists} : get all the messageLists.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of messageLists in body.
     */
    @GetMapping("")
    public List<MessageList> getAllMessageLists(
        @RequestParam(name = "eagerload", required = false, defaultValue = "true") boolean eagerload
    ) {
        log.debug("REST request to get all MessageLists");
        if (eagerload) {
            return messageListRepository.findAllWithEagerRelationships();
        } else {
            return messageListRepository.findAll();
        }
    }

    /**
     * {@code GET  /message-lists/:id} : get the "id" messageList.
     *
     * @param id the id of the messageList to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the messageList, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<MessageList> getMessageList(@PathVariable("id") Long id) {
        log.debug("REST request to get MessageList : {}", id);
        Optional<MessageList> messageList = messageListRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(messageList);
    }

    /**
     * {@code DELETE  /message-lists/:id} : delete the "id" messageList.
     *
     * @param id the id of the messageList to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMessageList(@PathVariable("id") Long id) {
        log.debug("REST request to delete MessageList : {}", id);
        messageListRepository.deleteById(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
