package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Category;
import com.mycompany.myapp.domain.Image;
import com.mycompany.myapp.domain.Paragraph;
import com.mycompany.myapp.domain.Post;
import com.mycompany.myapp.repository.CategoryRepository;
import com.mycompany.myapp.repository.ImageRepository;
import com.mycompany.myapp.repository.ParagraphRepository;
import com.mycompany.myapp.repository.PostRepository;
import com.mycompany.myapp.service.dto.CategoryDTO;
import com.mycompany.myapp.service.dto.ImageDTO;
import com.mycompany.myapp.service.dto.ParagraphDTO;
import com.mycompany.myapp.service.dto.PostDTO;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private ParagraphRepository paragraphRepository;

    @Autowired
    private ImageRepository imageRepository;

    // public List<CategoryDTO> getCategoriesWithLatestPosts() {
    //     List<Category> categories = categoryRepository.findAll();

    //     return categories.stream().map(category -> {
    //         CategoryDTO categoryDTO = new CategoryDTO();
    //         categoryDTO.setId(category.getId());
    //         categoryDTO.setName(category.getName());

    //         List<Post> posts = postRepository.findTop4ByCategoryIdOrderByCreatedAtDesc(category.getId());
    //         List<PostDTO> postDTOs = posts.stream().map(post -> {
    //             PostDTO postDTO = new PostDTO();
    //             postDTO.setId(post.getId());
    //             postDTO.setName(post.getName());
    //             postDTO.setCreatedAt(post.getCreatedAt());

    //             List<Paragraph> paragraphs = paragraphRepository.findAllByPostId(post.getId());
    //             if (!paragraphs.isEmpty()) {
    //                 Paragraph firstParagraph = paragraphs.get(0);
    //                 ParagraphDTO paragraphDTO = new ParagraphDTO();
    //                 paragraphDTO.setId(firstParagraph.getId());
    //                 paragraphDTO.setName(firstParagraph.getName());
    //                 paragraphDTO.setDescription(firstParagraph.getDescription());

    //                 Optional<Image> image = imageRepository.findFirstByParagraphId(firstParagraph.getId());
    //                 image.ifPresent(img -> {
    //                     ImageDTO imageDTO = new ImageDTO();
    //                     imageDTO.setId(img.getId());
    //                     imageDTO.setName(img.getName());
    //                     imageDTO.setImage(img.getImage());
    //                     paragraphDTO.setImage(imageDTO);
    //                 });

    //                 postDTO.setParagraph(paragraphDTO);
    //             }

    //             return postDTO;
    //         }).collect(Collectors.toList());

    //         categoryDTO.setPosts(postDTOs);

    //         return categoryDTO;
    //     }).collect(Collectors.toList());
    // }
    public List<CategoryDTO> getCategoriesWithLatestPosts() {
        List<Category> categories = categoryRepository.findAll();

        List<CategoryDTO> categoryDTOList = categories
            .stream()
            .map(category -> {
                CategoryDTO categoryDTO = new CategoryDTO();
                categoryDTO.setId(category.getId());
                categoryDTO.setName(category.getName());

                List<Post> posts = postRepository.findTop4ByCategoryIdOrderByCreatedAtDesc(category.getId());
                List<PostDTO> postDTOs = posts
                    .stream()
                    .map(post -> {
                        PostDTO postDTO = new PostDTO();
                        postDTO.setId(post.getId());
                        postDTO.setName(post.getName());
                        postDTO.setCreatedAt(post.getCreatedAt());

                        List<Paragraph> paragraphs = paragraphRepository.findAllByPostId(post.getId());
                        if (!paragraphs.isEmpty()) {
                            Paragraph firstParagraph = paragraphs.get(0);
                            ParagraphDTO paragraphDTO = new ParagraphDTO();
                            paragraphDTO.setId(firstParagraph.getId());
                            paragraphDTO.setName(firstParagraph.getName());
                            paragraphDTO.setDescription(firstParagraph.getDescription());

                            Optional<Image> image = imageRepository.findFirstByParagraphId(firstParagraph.getId());
                            image.ifPresent(img -> {
                                ImageDTO imageDTO = new ImageDTO();
                                imageDTO.setId(img.getId());
                                imageDTO.setName(img.getName());
                                imageDTO.setImage(img.getImage());
                                paragraphDTO.setImage(imageDTO);
                            });

                            postDTO.setParagraph(paragraphDTO);
                        }

                        return postDTO;
                    })
                    .collect(Collectors.toList());

                categoryDTO.setPosts(postDTOs);

                return categoryDTO;
            })
            .collect(Collectors.toList());

        // Thêm category "view" vào cuối danh sách
        CategoryDTO viewCategoryDTO = new CategoryDTO();
        viewCategoryDTO.setName("view");

        List<Post> topViewedPosts = postRepository.findTop4OrderByViewDesc();
        List<PostDTO> topViewedPostDTOs = topViewedPosts
            .stream()
            .map(post -> {
                PostDTO postDTO = new PostDTO();
                postDTO.setId(post.getId());
                postDTO.setName(post.getName());
                postDTO.setCreatedAt(post.getCreatedAt());

                List<Paragraph> paragraphs = paragraphRepository.findAllByPostId(post.getId());
                if (!paragraphs.isEmpty()) {
                    Paragraph firstParagraph = paragraphs.get(0);
                    ParagraphDTO paragraphDTO = new ParagraphDTO();
                    paragraphDTO.setId(firstParagraph.getId());
                    paragraphDTO.setName(firstParagraph.getName());
                    paragraphDTO.setDescription(firstParagraph.getDescription());

                    Optional<Image> image = imageRepository.findFirstByParagraphId(firstParagraph.getId());
                    image.ifPresent(img -> {
                        ImageDTO imageDTO = new ImageDTO();
                        imageDTO.setId(img.getId());
                        imageDTO.setName(img.getName());
                        imageDTO.setImage(img.getImage());
                        paragraphDTO.setImage(imageDTO);
                    });

                    postDTO.setParagraph(paragraphDTO);
                }

                return postDTO;
            })
            .collect(Collectors.toList());

        viewCategoryDTO.setPosts(topViewedPostDTOs);
        categoryDTOList.add(viewCategoryDTO);

        return categoryDTOList;
    }
}
