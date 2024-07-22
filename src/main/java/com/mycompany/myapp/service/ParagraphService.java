package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Paragraph;
import com.mycompany.myapp.repository.ParagraphRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ParagraphService {

    private final ParagraphRepository paragraphRepository;

    public ParagraphService(ParagraphRepository paragraphRepository) {
        this.paragraphRepository = paragraphRepository;
    }

    @Transactional(readOnly = true)
    public List<Paragraph> findAllByPostId(Long postId) {
        return paragraphRepository.findAllByPostId(postId);
    }
}
