package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Image;
import com.mycompany.myapp.domain.Paragraph;
import com.mycompany.myapp.domain.Person;
import com.mycompany.myapp.domain.Post;
import com.mycompany.myapp.domain.Status;
import com.mycompany.myapp.repository.ImageRepository;
import com.mycompany.myapp.repository.ParagraphRepository;
import com.mycompany.myapp.repository.PersonRepository;
import com.mycompany.myapp.repository.PostRepository;
import com.mycompany.myapp.service.dto.ImageDTO;
import com.mycompany.myapp.service.dto.ParagraphDTO;
import com.mycompany.myapp.service.dto.PersonDTO;
import com.mycompany.myapp.service.dto.PostDTO;
import com.mycompany.myapp.service.dto.PostDetailDTO;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PostService {

    private final PostRepository postRepository;
    private final PersonRepository personRepository;
    private final ImageRepository imageRepository;
    private final ParagraphRepository paragraphRepository;

    public PostService(
        PostRepository postRepository,
        PersonRepository personRepository,
        ImageRepository imageRepository,
        ParagraphRepository paragraphRepository
    ) {
        this.postRepository = postRepository;
        this.personRepository = personRepository;
        this.imageRepository = imageRepository;
        this.paragraphRepository = paragraphRepository;
    }

    @Transactional(readOnly = true)
    public List<Post> findAllByPersonId(Long personId) {
        return postRepository.findAllByPersonId(personId);
    }

    public List<PostDetailDTO> getAllPostDetails() {
        // Fetch all posts
        List<Post> posts = postRepository.findAll();

        // Map posts to DTOs
        return posts
            .stream()
            .map(post -> {
                PostDetailDTO dto = new PostDetailDTO();
                dto.setId(post.getId());
                dto.setName(post.getName());
                dto.setCreatedAt(post.getCreatedAt());
                dto.setUpdatedAt(post.getUpdateAt());
                dto.setStatus(post.getStatus());
                dto.setView(post.getView());

                // Fetch person associated with the post
                Person person = personRepository.findById(post.getPerson().getId()).orElse(null);
                if (person != null) {
                    PersonDTO personDTO = new PersonDTO();
                    personDTO.setId(person.getId());
                    personDTO.setName(person.getName());
                    personDTO.setPhone(person.getPhone());
                    personDTO.setAddress(person.getAddress());
                    personDTO.setCreatedAt(person.getCreatedAt());
                    personDTO.setUpdateAt(person.getUpdateAt());
                    personDTO.setDateOfBirth(person.getDateOfBirth());

                    // Fetch image associated with the person
                    Image personImage = imageRepository.findByPersonId(person.getId()).orElse(null);
                    if (personImage != null) {
                        ImageDTO imageDTO = new ImageDTO();
                        imageDTO.setId(personImage.getId());
                        imageDTO.setName(personImage.getName());
                        imageDTO.setImage(personImage.getImage());
                        // imageDTO.setHeight(personImage.getHeight());
                        // imageDTO.setWidth(personImage.getWidth());
                        // imageDTO.setTaken(personImage.getTaken());
                        // imageDTO.setUploaded(personImage.getUploaded());
                        personDTO.setImage(imageDTO);
                    }

                    dto.setPersonDTO(personDTO);
                }

                // Fetch paragraphs for the post
                List<Paragraph> paragraphs = paragraphRepository.findAllByPostId(post.getId());
                List<ParagraphDTO> paragraphDTOs = paragraphs
                    .stream()
                    .map(paragraph -> {
                        ParagraphDTO pDTO = new ParagraphDTO();
                        pDTO.setId(paragraph.getId());
                        pDTO.setName(paragraph.getName());
                        pDTO.setDescription(paragraph.getDescription());
                        // pDTO.setOrder(paragraph.getOrder());
                        return pDTO;
                    })
                    .collect(Collectors.toList());
                dto.setParagraphs(paragraphDTOs);

                // Fetch the first image of the post
                if (!paragraphs.isEmpty()) {
                    Image postImage = imageRepository.findFirstByParagraphId(paragraphs.get(0).getId()).orElse(null);
                    ImageDTO imageDTO = new ImageDTO();
                    if (postImage != null) {
                        imageDTO.setId(postImage.getId());
                        imageDTO.setName(postImage.getName());
                        imageDTO.setImage(postImage.getImage());
                    }
                    dto.setPostImage(imageDTO);
                }

                return dto;
            })
            .collect(Collectors.toList());
    }

    public List<PostDTO> findPostsByCategoryAndStatus(Long categoryId) {
        List<Post> posts = postRepository.findAllByCategoryIdAndStatus(categoryId, Status.SUCCESS);
        List<PostDTO> postDTOs = new ArrayList<>();

        for (Post post : posts) {
            PostDTO postDTO = new PostDTO();
            postDTO.setId(post.getId());
            postDTO.setName(post.getName());
            postDTO.setCreatedAt(post.getCreatedAt());

            // List<Paragraph> paragraphs = paragraphRepository.findAllByPostIdOrderByOrderAsc(post.getId());
            // if (!paragraphs.isEmpty()) {
            //     Paragraph firstParagraph = paragraphs.get(0);
            //     postDTO.setParagraphName(firstParagraph.getName());
            //     postDTO.setParagraphDescription(firstParagraph.getDescription());

            //     List<Image> images = imageRepository.findAllByParagraphId(firstParagraph.getId());
            //     if (!images.isEmpty()) {
            //         postDTO.setImageUrl(images.get(0).getImage().toString()); // Cần chỉnh sửa theo cách lưu trữ và truy xuất image thực tế của bạn
            //     }
            // }
            postDTOs.add(postDTO);
        }
        return postDTOs;
    }
}
