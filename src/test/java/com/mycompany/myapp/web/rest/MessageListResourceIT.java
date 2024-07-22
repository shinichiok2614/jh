package com.mycompany.myapp.web.rest;

import static com.mycompany.myapp.domain.MessageListAsserts.*;
import static com.mycompany.myapp.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.MessageList;
import com.mycompany.myapp.repository.MessageListRepository;
import jakarta.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link MessageListResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class MessageListResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String ENTITY_API_URL = "/api/message-lists";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private MessageListRepository messageListRepository;

    @Mock
    private MessageListRepository messageListRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMessageListMockMvc;

    private MessageList messageList;

    private MessageList insertedMessageList;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MessageList createEntity(EntityManager em) {
        MessageList messageList = new MessageList().name(DEFAULT_NAME).createdAt(DEFAULT_CREATED_AT);
        return messageList;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MessageList createUpdatedEntity(EntityManager em) {
        MessageList messageList = new MessageList().name(UPDATED_NAME).createdAt(UPDATED_CREATED_AT);
        return messageList;
    }

    @BeforeEach
    public void initTest() {
        messageList = createEntity(em);
    }

    @AfterEach
    public void cleanup() {
        if (insertedMessageList != null) {
            messageListRepository.delete(insertedMessageList);
            insertedMessageList = null;
        }
    }

    @Test
    @Transactional
    void createMessageList() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the MessageList
        var returnedMessageList = om.readValue(
            restMessageListMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(messageList)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            MessageList.class
        );

        // Validate the MessageList in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertMessageListUpdatableFieldsEquals(returnedMessageList, getPersistedMessageList(returnedMessageList));

        insertedMessageList = returnedMessageList;
    }

    @Test
    @Transactional
    void createMessageListWithExistingId() throws Exception {
        // Create the MessageList with an existing ID
        messageList.setId(1L);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restMessageListMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(messageList)))
            .andExpect(status().isBadRequest());

        // Validate the MessageList in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllMessageLists() throws Exception {
        // Initialize the database
        insertedMessageList = messageListRepository.saveAndFlush(messageList);

        // Get all the messageListList
        restMessageListMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(messageList.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllMessageListsWithEagerRelationshipsIsEnabled() throws Exception {
        when(messageListRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restMessageListMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(messageListRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllMessageListsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(messageListRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restMessageListMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(messageListRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    @Transactional
    void getMessageList() throws Exception {
        // Initialize the database
        insertedMessageList = messageListRepository.saveAndFlush(messageList);

        // Get the messageList
        restMessageListMockMvc
            .perform(get(ENTITY_API_URL_ID, messageList.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(messageList.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()));
    }

    @Test
    @Transactional
    void getNonExistingMessageList() throws Exception {
        // Get the messageList
        restMessageListMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingMessageList() throws Exception {
        // Initialize the database
        insertedMessageList = messageListRepository.saveAndFlush(messageList);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the messageList
        MessageList updatedMessageList = messageListRepository.findById(messageList.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedMessageList are not directly saved in db
        em.detach(updatedMessageList);
        updatedMessageList.name(UPDATED_NAME).createdAt(UPDATED_CREATED_AT);

        restMessageListMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedMessageList.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(updatedMessageList))
            )
            .andExpect(status().isOk());

        // Validate the MessageList in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedMessageListToMatchAllProperties(updatedMessageList);
    }

    @Test
    @Transactional
    void putNonExistingMessageList() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        messageList.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMessageListMockMvc
            .perform(
                put(ENTITY_API_URL_ID, messageList.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(messageList))
            )
            .andExpect(status().isBadRequest());

        // Validate the MessageList in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchMessageList() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        messageList.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMessageListMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(messageList))
            )
            .andExpect(status().isBadRequest());

        // Validate the MessageList in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamMessageList() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        messageList.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMessageListMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(messageList)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the MessageList in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateMessageListWithPatch() throws Exception {
        // Initialize the database
        insertedMessageList = messageListRepository.saveAndFlush(messageList);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the messageList using partial update
        MessageList partialUpdatedMessageList = new MessageList();
        partialUpdatedMessageList.setId(messageList.getId());

        partialUpdatedMessageList.name(UPDATED_NAME).createdAt(UPDATED_CREATED_AT);

        restMessageListMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMessageList.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedMessageList))
            )
            .andExpect(status().isOk());

        // Validate the MessageList in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertMessageListUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedMessageList, messageList),
            getPersistedMessageList(messageList)
        );
    }

    @Test
    @Transactional
    void fullUpdateMessageListWithPatch() throws Exception {
        // Initialize the database
        insertedMessageList = messageListRepository.saveAndFlush(messageList);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the messageList using partial update
        MessageList partialUpdatedMessageList = new MessageList();
        partialUpdatedMessageList.setId(messageList.getId());

        partialUpdatedMessageList.name(UPDATED_NAME).createdAt(UPDATED_CREATED_AT);

        restMessageListMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMessageList.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedMessageList))
            )
            .andExpect(status().isOk());

        // Validate the MessageList in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertMessageListUpdatableFieldsEquals(partialUpdatedMessageList, getPersistedMessageList(partialUpdatedMessageList));
    }

    @Test
    @Transactional
    void patchNonExistingMessageList() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        messageList.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMessageListMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, messageList.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(messageList))
            )
            .andExpect(status().isBadRequest());

        // Validate the MessageList in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchMessageList() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        messageList.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMessageListMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(messageList))
            )
            .andExpect(status().isBadRequest());

        // Validate the MessageList in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamMessageList() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        messageList.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMessageListMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(messageList)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the MessageList in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteMessageList() throws Exception {
        // Initialize the database
        insertedMessageList = messageListRepository.saveAndFlush(messageList);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the messageList
        restMessageListMockMvc
            .perform(delete(ENTITY_API_URL_ID, messageList.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return messageListRepository.count();
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

    protected MessageList getPersistedMessageList(MessageList messageList) {
        return messageListRepository.findById(messageList.getId()).orElseThrow();
    }

    protected void assertPersistedMessageListToMatchAllProperties(MessageList expectedMessageList) {
        assertMessageListAllPropertiesEquals(expectedMessageList, getPersistedMessageList(expectedMessageList));
    }

    protected void assertPersistedMessageListToMatchUpdatableProperties(MessageList expectedMessageList) {
        assertMessageListAllUpdatablePropertiesEquals(expectedMessageList, getPersistedMessageList(expectedMessageList));
    }
}
