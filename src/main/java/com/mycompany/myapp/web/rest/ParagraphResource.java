package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Paragraph;
import com.mycompany.myapp.repository.ParagraphRepository;
import com.mycompany.myapp.service.ParagraphService;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Paragraph}.
 */
@RestController
@RequestMapping("/api/paragraphs")
@Transactional
public class ParagraphResource {

    private static final Logger log = LoggerFactory.getLogger(ParagraphResource.class);

    private static final String ENTITY_NAME = "paragraph";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ParagraphRepository paragraphRepository;
    private final ParagraphService paragraphService;

    public ParagraphResource(ParagraphRepository paragraphRepository, ParagraphService paragraphService) {
        this.paragraphRepository = paragraphRepository;
        this.paragraphService = paragraphService;
    }

    /**
     * {@code POST  /paragraphs} : Create a new paragraph.
     *
     * @param paragraph the paragraph to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new paragraph, or with status {@code 400 (Bad Request)} if the paragraph has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Paragraph> createParagraph(@Valid @RequestBody Paragraph paragraph) throws URISyntaxException {
        log.debug("REST request to save Paragraph : {}", paragraph);
        if (paragraph.getId() != null) {
            throw new BadRequestAlertException("A new paragraph cannot already have an ID", ENTITY_NAME, "idexists");
        }
        paragraph = paragraphRepository.save(paragraph);
        return ResponseEntity.created(new URI("/api/paragraphs/" + paragraph.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, paragraph.getId().toString()))
            .body(paragraph);
    }

    /**
     * {@code PUT  /paragraphs/:id} : Updates an existing paragraph.
     *
     * @param id the id of the paragraph to save.
     * @param paragraph the paragraph to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated paragraph,
     * or with status {@code 400 (Bad Request)} if the paragraph is not valid,
     * or with status {@code 500 (Internal Server Error)} if the paragraph couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Paragraph> updateParagraph(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Paragraph paragraph
    ) throws URISyntaxException {
        log.debug("REST request to update Paragraph : {}, {}", id, paragraph);
        if (paragraph.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, paragraph.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!paragraphRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        paragraph = paragraphRepository.save(paragraph);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, paragraph.getId().toString()))
            .body(paragraph);
    }

    /**
     * {@code PATCH  /paragraphs/:id} : Partial updates given fields of an existing paragraph, field will ignore if it is null
     *
     * @param id the id of the paragraph to save.
     * @param paragraph the paragraph to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated paragraph,
     * or with status {@code 400 (Bad Request)} if the paragraph is not valid,
     * or with status {@code 404 (Not Found)} if the paragraph is not found,
     * or with status {@code 500 (Internal Server Error)} if the paragraph couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Paragraph> partialUpdateParagraph(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Paragraph paragraph
    ) throws URISyntaxException {
        log.debug("REST request to partial update Paragraph partially : {}, {}", id, paragraph);
        if (paragraph.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, paragraph.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!paragraphRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Paragraph> result = paragraphRepository
            .findById(paragraph.getId())
            .map(existingParagraph -> {
                if (paragraph.getName() != null) {
                    existingParagraph.setName(paragraph.getName());
                }
                if (paragraph.getDescription() != null) {
                    existingParagraph.setDescription(paragraph.getDescription());
                }
                if (paragraph.getOrder() != null) {
                    existingParagraph.setOrder(paragraph.getOrder());
                }
                if (paragraph.getCreatedAt() != null) {
                    existingParagraph.setCreatedAt(paragraph.getCreatedAt());
                }
                if (paragraph.getUpdateAt() != null) {
                    existingParagraph.setUpdateAt(paragraph.getUpdateAt());
                }

                return existingParagraph;
            })
            .map(paragraphRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, paragraph.getId().toString())
        );
    }

    /**
     * {@code GET  /paragraphs} : get all the paragraphs.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of paragraphs in body.
     */
    @GetMapping("")
    public List<Paragraph> getAllParagraphs(@RequestParam(name = "eagerload", required = false, defaultValue = "true") boolean eagerload) {
        log.debug("REST request to get all Paragraphs");
        if (eagerload) {
            return paragraphRepository.findAllWithEagerRelationships();
        } else {
            return paragraphRepository.findAll();
        }
    }

    /**
     * {@code GET  /paragraphs/:id} : get the "id" paragraph.
     *
     * @param id the id of the paragraph to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the paragraph, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Paragraph> getParagraph(@PathVariable("id") Long id) {
        log.debug("REST request to get Paragraph : {}", id);
        Optional<Paragraph> paragraph = paragraphRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(paragraph);
    }

    /**
     * {@code DELETE  /paragraphs/:id} : delete the "id" paragraph.
     *
     * @param id the id of the paragraph to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteParagraph(@PathVariable("id") Long id) {
        log.debug("REST request to delete Paragraph : {}", id);
        paragraphRepository.deleteById(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }

    // @GetMapping("/by-post/{postId}")
    // public ResponseEntity<List<Paragraph>> getAllParagraphsByPostId(@PathVariable Long postId) {
    //     List<Paragraph> paragraphs = paragraphService.findAllByPostId(postId);
    //     return ResponseEntity.ok().body(paragraphs);
    // }
    @GetMapping("/by-post/{postId}")
    public List<Paragraph> getAllParagraphsByPostId(@PathVariable Long postId) {
        return paragraphService.findAllByPostId(postId);
    }
}
