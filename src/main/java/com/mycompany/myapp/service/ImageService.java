package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Image;
import com.mycompany.myapp.repository.ImageRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ImageService {

    private final ImageRepository imageRepository;

    public ImageService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    @Transactional(readOnly = true)
    public List<Image> findAllByParagraphId(Long postId) {
        return imageRepository.findAllByParagraphId(postId);
    }

    public List<Image> findAllByPostId(Long postId) {
        // Sử dụng phương thức trong ImageRepository để lấy hình ảnh theo postId
        return imageRepository.findImagesByPostId(postId);
    }
}
