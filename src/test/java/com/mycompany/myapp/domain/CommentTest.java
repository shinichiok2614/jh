package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.CommentListTestSamples.*;
import static com.mycompany.myapp.domain.CommentTestSamples.*;
import static com.mycompany.myapp.domain.PersonTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CommentTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Comment.class);
        Comment comment1 = getCommentSample1();
        Comment comment2 = new Comment();
        assertThat(comment1).isNotEqualTo(comment2);

        comment2.setId(comment1.getId());
        assertThat(comment1).isEqualTo(comment2);

        comment2 = getCommentSample2();
        assertThat(comment1).isNotEqualTo(comment2);
    }

    @Test
    void personTest() {
        Comment comment = getCommentRandomSampleGenerator();
        Person personBack = getPersonRandomSampleGenerator();

        comment.setPerson(personBack);
        assertThat(comment.getPerson()).isEqualTo(personBack);

        comment.person(null);
        assertThat(comment.getPerson()).isNull();
    }

    @Test
    void commentlistTest() {
        Comment comment = getCommentRandomSampleGenerator();
        CommentList commentListBack = getCommentListRandomSampleGenerator();

        comment.setCommentlist(commentListBack);
        assertThat(comment.getCommentlist()).isEqualTo(commentListBack);

        comment.commentlist(null);
        assertThat(comment.getCommentlist()).isNull();
    }
}
