package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class MessageListTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static MessageList getMessageListSample1() {
        return new MessageList().id(1L).name("name1");
    }

    public static MessageList getMessageListSample2() {
        return new MessageList().id(2L).name("name2");
    }

    public static MessageList getMessageListRandomSampleGenerator() {
        return new MessageList().id(longCount.incrementAndGet()).name(UUID.randomUUID().toString());
    }
}
