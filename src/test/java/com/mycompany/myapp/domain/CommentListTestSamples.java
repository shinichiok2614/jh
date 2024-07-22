package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class CommentListTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static CommentList getCommentListSample1() {
        return new CommentList().id(1L).name("name1");
    }

    public static CommentList getCommentListSample2() {
        return new CommentList().id(2L).name("name2");
    }

    public static CommentList getCommentListRandomSampleGenerator() {
        return new CommentList().id(longCount.incrementAndGet()).name(UUID.randomUUID().toString());
    }
}
