package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.MessageListTestSamples.*;
import static com.mycompany.myapp.domain.PersonTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class MessageListTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MessageList.class);
        MessageList messageList1 = getMessageListSample1();
        MessageList messageList2 = new MessageList();
        assertThat(messageList1).isNotEqualTo(messageList2);

        messageList2.setId(messageList1.getId());
        assertThat(messageList1).isEqualTo(messageList2);

        messageList2 = getMessageListSample2();
        assertThat(messageList1).isNotEqualTo(messageList2);
    }

    @Test
    void authorTest() {
        MessageList messageList = getMessageListRandomSampleGenerator();
        Person personBack = getPersonRandomSampleGenerator();

        messageList.setAuthor(personBack);
        assertThat(messageList.getAuthor()).isEqualTo(personBack);

        messageList.author(null);
        assertThat(messageList.getAuthor()).isNull();
    }

    @Test
    void receiverTest() {
        MessageList messageList = getMessageListRandomSampleGenerator();
        Person personBack = getPersonRandomSampleGenerator();

        messageList.setReceiver(personBack);
        assertThat(messageList.getReceiver()).isEqualTo(personBack);

        messageList.receiver(null);
        assertThat(messageList.getReceiver()).isNull();
    }
}
