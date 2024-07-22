package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

public class ParagraphTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static Paragraph getParagraphSample1() {
        return new Paragraph().id(1L).name("name1").order(1);
    }

    public static Paragraph getParagraphSample2() {
        return new Paragraph().id(2L).name("name2").order(2);
    }

    public static Paragraph getParagraphRandomSampleGenerator() {
        return new Paragraph().id(longCount.incrementAndGet()).name(UUID.randomUUID().toString()).order(intCount.incrementAndGet());
    }
}
