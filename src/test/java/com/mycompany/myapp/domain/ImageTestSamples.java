package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

public class ImageTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static Image getImageSample1() {
        return new Image().id(1L).name("name1").height(1).width(1);
    }

    public static Image getImageSample2() {
        return new Image().id(2L).name("name2").height(2).width(2);
    }

    public static Image getImageRandomSampleGenerator() {
        return new Image()
            .id(longCount.incrementAndGet())
            .name(UUID.randomUUID().toString())
            .height(intCount.incrementAndGet())
            .width(intCount.incrementAndGet());
    }
}
