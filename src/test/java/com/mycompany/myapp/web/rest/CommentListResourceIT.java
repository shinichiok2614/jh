package com.mycompany.myapp.web.rest;

import static com.mycompany.myapp.domain.CommentListAsserts.*;
import static com.mycompany.myapp.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.CommentList;
import com.mycompany.myapp.repository.CommentListRepository;
import jakarta.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link CommentListResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CommentListResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String ENTITY_API_URL = "/api/comment-lists";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private CommentListRepository commentListRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCommentListMockMvc;

    private CommentList commentList;

    private CommentList insertedCommentList;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CommentList createEntity(EntityManager em) {
        CommentList commentList = new CommentList().name(DEFAULT_NAME).createdAt(DEFAULT_CREATED_AT);
        return commentList;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CommentList createUpdatedEntity(EntityManager em) {
        CommentList commentList = new CommentList().name(UPDATED_NAME).createdAt(UPDATED_CREATED_AT);
        return commentList;
    }

    @BeforeEach
    public void initTest() {
        commentList = createEntity(em);
    }

    @AfterEach
    public void cleanup() {
        if (insertedCommentList != null) {
            commentListRepository.delete(insertedCommentList);
            insertedCommentList = null;
        }
    }

    @Test
    @Transactional
    void createCommentList() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the CommentList
        var returnedCommentList = om.readValue(
            restCommentListMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(commentList)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            CommentList.class
        );

        // Validate the CommentList in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertCommentListUpdatableFieldsEquals(returnedCommentList, getPersistedCommentList(returnedCommentList));

        insertedCommentList = returnedCommentList;
    }

    @Test
    @Transactional
    void createCommentListWithExistingId() throws Exception {
        // Create the CommentList with an existing ID
        commentList.setId(1L);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCommentListMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(commentList)))
            .andExpect(status().isBadRequest());

        // Validate the CommentList in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNameIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        commentList.setName(null);

        // Create the CommentList, which fails.

        restCommentListMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(commentList)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllCommentLists() throws Exception {
        // Initialize the database
        insertedCommentList = commentListRepository.saveAndFlush(commentList);

        // Get all the commentListList
        restCommentListMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(commentList.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())));
    }

    @Test
    @Transactional
    void getCommentList() throws Exception {
        // Initialize the database
        insertedCommentList = commentListRepository.saveAndFlush(commentList);

        // Get the commentList
        restCommentListMockMvc
            .perform(get(ENTITY_API_URL_ID, commentList.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(commentList.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()));
    }

    @Test
    @Transactional
    void getNonExistingCommentList() throws Exception {
        // Get the commentList
        restCommentListMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingCommentList() throws Exception {
        // Initialize the database
        insertedCommentList = commentListRepository.saveAndFlush(commentList);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the commentList
        CommentList updatedCommentList = commentListRepository.findById(commentList.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedCommentList are not directly saved in db
        em.detach(updatedCommentList);
        updatedCommentList.name(UPDATED_NAME).createdAt(UPDATED_CREATED_AT);

        restCommentListMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCommentList.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(updatedCommentList))
            )
            .andExpect(status().isOk());

        // Validate the CommentList in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedCommentListToMatchAllProperties(updatedCommentList);
    }

    @Test
    @Transactional
    void putNonExistingCommentList() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        commentList.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCommentListMockMvc
            .perform(
                put(ENTITY_API_URL_ID, commentList.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(commentList))
            )
            .andExpect(status().isBadRequest());

        // Validate the CommentList in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCommentList() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        commentList.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCommentListMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(commentList))
            )
            .andExpect(status().isBadRequest());

        // Validate the CommentList in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCommentList() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        commentList.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCommentListMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(commentList)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CommentList in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCommentListWithPatch() throws Exception {
        // Initialize the database
        insertedCommentList = commentListRepository.saveAndFlush(commentList);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the commentList using partial update
        CommentList partialUpdatedCommentList = new CommentList();
        partialUpdatedCommentList.setId(commentList.getId());

        partialUpdatedCommentList.name(UPDATED_NAME).createdAt(UPDATED_CREATED_AT);

        restCommentListMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCommentList.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedCommentList))
            )
            .andExpect(status().isOk());

        // Validate the CommentList in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertCommentListUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedCommentList, commentList),
            getPersistedCommentList(commentList)
        );
    }

    @Test
    @Transactional
    void fullUpdateCommentListWithPatch() throws Exception {
        // Initialize the database
        insertedCommentList = commentListRepository.saveAndFlush(commentList);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the commentList using partial update
        CommentList partialUpdatedCommentList = new CommentList();
        partialUpdatedCommentList.setId(commentList.getId());

        partialUpdatedCommentList.name(UPDATED_NAME).createdAt(UPDATED_CREATED_AT);

        restCommentListMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCommentList.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedCommentList))
            )
            .andExpect(status().isOk());

        // Validate the CommentList in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertCommentListUpdatableFieldsEquals(partialUpdatedCommentList, getPersistedCommentList(partialUpdatedCommentList));
    }

    @Test
    @Transactional
    void patchNonExistingCommentList() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        commentList.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCommentListMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, commentList.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(commentList))
            )
            .andExpect(status().isBadRequest());

        // Validate the CommentList in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCommentList() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        commentList.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCommentListMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(commentList))
            )
            .andExpect(status().isBadRequest());

        // Validate the CommentList in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCommentList() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        commentList.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCommentListMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(commentList)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CommentList in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCommentList() throws Exception {
        // Initialize the database
        insertedCommentList = commentListRepository.saveAndFlush(commentList);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the commentList
        restCommentListMockMvc
            .perform(delete(ENTITY_API_URL_ID, commentList.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return commentListRepository.count();
    }

    protected void assertIncrementedRepositoryCount(long countBefore) {
        assertThat(countBefore + 1).isEqualTo(getRepositoryCount());
    }

    protected void assertDecrementedRepositoryCount(long countBefore) {
        assertThat(countBefore - 1).isEqualTo(getRepositoryCount());
    }

    protected void assertSameRepositoryCount(long countBefore) {
        assertThat(countBefore).isEqualTo(getRepositoryCount());
    }

    protected CommentList getPersistedCommentList(CommentList commentList) {
        return commentListRepository.findById(commentList.getId()).orElseThrow();
    }

    protected void assertPersistedCommentListToMatchAllProperties(CommentList expectedCommentList) {
        assertCommentListAllPropertiesEquals(expectedCommentList, getPersistedCommentList(expectedCommentList));
    }

    protected void assertPersistedCommentListToMatchUpdatableProperties(CommentList expectedCommentList) {
        assertCommentListAllUpdatablePropertiesEquals(expectedCommentList, getPersistedCommentList(expectedCommentList));
    }
}
