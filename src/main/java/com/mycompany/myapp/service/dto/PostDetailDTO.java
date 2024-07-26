package com.mycompany.myapp.service.dto;

import com.mycompany.myapp.domain.Person;
import com.mycompany.myapp.domain.enumeration.Status;
import java.time.Instant;
import java.util.List;

public class PostDetailDTO {

    private Long id;
    private String name;
    private Instant createdAt;
    private Instant updatedAt;
    private Status status;
    private Integer view;
    private PersonDTO personDTO;
    private List<ParagraphDTO> paragraphs;
    private ImageDTO postImage;

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

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Integer getView() {
        return view;
    }

    public void setView(Integer view) {
        this.view = view;
    }

    public List<ParagraphDTO> getParagraphs() {
        return paragraphs;
    }

    public void setParagraphs(List<ParagraphDTO> paragraphs) {
        this.paragraphs = paragraphs;
    }

    public ImageDTO getPostImage() {
        return postImage;
    }

    public void setPostImage(ImageDTO postImage) {
        this.postImage = postImage;
    }

    public PersonDTO getPersonDTO() {
        return personDTO;
    }

    public void setPersonDTO(PersonDTO personDTO) {
        this.personDTO = personDTO;
    }
}
