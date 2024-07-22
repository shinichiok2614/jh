package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.CommentListTestSamples.*;
import static com.mycompany.myapp.domain.PostTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CommentListTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CommentList.class);
        CommentList commentList1 = getCommentListSample1();
        CommentList commentList2 = new CommentList();
        assertThat(commentList1).isNotEqualTo(commentList2);

        commentList2.setId(commentList1.getId());
        assertThat(commentList1).isEqualTo(commentList2);

        commentList2 = getCommentListSample2();
        assertThat(commentList1).isNotEqualTo(commentList2);
    }

    @Test
    void postTest() {
        CommentList commentList = getCommentListRandomSampleGenerator();
        Post postBack = getPostRandomSampleGenerator();

        commentList.setPost(postBack);
        assertThat(commentList.getPost()).isEqualTo(postBack);

        commentList.post(null);
        assertThat(commentList.getPost()).isNull();
    }
}
