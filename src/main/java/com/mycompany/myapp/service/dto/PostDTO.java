package com.mycompany.myapp.service.dto;

import java.time.Instant;

public class PostDTO {

    private Long id;
    private String name;
    private Instant createdAt;
    private ParagraphDTO paragraph;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public ParagraphDTO getParagraph() {
        return paragraph;
    }

    public void setParagraph(ParagraphDTO paragraph) {
        this.paragraph = paragraph;
    }
}
