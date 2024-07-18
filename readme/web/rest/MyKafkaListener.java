package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Category;
import java.util.List;
import org.springframework.kafka.annotation.KafkaHandler;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@KafkaListener(id = "groupA", topics = { "get-all-categories", "insert-a-category" })
public class MyKafkaListener {

    @KafkaHandler
    public void listenCategory(Category category) {
        System.out.println("Received: " + category);
    }

    @KafkaHandler(isDefault = true)
    public void unknown(Object object) {
        System.out.println("Received unknown: " + object);
    }

    @KafkaHandler
    public void listenListOfCategories(List<Category> categories) {
        System.out.println("Received: " + categories);
    }
}
