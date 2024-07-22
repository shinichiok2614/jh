package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.AlbumTestSamples.*;
import static com.mycompany.myapp.domain.CategoryTestSamples.*;
import static com.mycompany.myapp.domain.CommentListTestSamples.*;
import static com.mycompany.myapp.domain.PersonTestSamples.*;
import static com.mycompany.myapp.domain.PostTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class PostTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Post.class);
        Post post1 = getPostSample1();
        Post post2 = new Post();
        assertThat(post1).isNotEqualTo(post2);

        post2.setId(post1.getId());
        assertThat(post1).isEqualTo(post2);

        post2 = getPostSample2();
        assertThat(post1).isNotEqualTo(post2);
    }

    @Test
    void categoryTest() {
        Post post = getPostRandomSampleGenerator();
        Category categoryBack = getCategoryRandomSampleGenerator();

        post.setCategory(categoryBack);
        assertThat(post.getCategory()).isEqualTo(categoryBack);

        post.category(null);
        assertThat(post.getCategory()).isNull();
    }

    @Test
    void personTest() {
        Post post = getPostRandomSampleGenerator();
        Person personBack = getPersonRandomSampleGenerator();

        post.setPerson(personBack);
        assertThat(post.getPerson()).isEqualTo(personBack);

        post.person(null);
        assertThat(post.getPerson()).isNull();
    }

    @Test
    void albumTest() {
        Post post = getPostRandomSampleGenerator();
        Album albumBack = getAlbumRandomSampleGenerator();

        post.setAlbum(albumBack);
        assertThat(post.getAlbum()).isEqualTo(albumBack);
        assertThat(albumBack.getPost()).isEqualTo(post);

        post.album(null);
        assertThat(post.getAlbum()).isNull();
        assertThat(albumBack.getPost()).isNull();
    }

    @Test
    void commentListTest() {
        Post post = getPostRandomSampleGenerator();
        CommentList commentListBack = getCommentListRandomSampleGenerator();

        post.setCommentList(commentListBack);
        assertThat(post.getCommentList()).isEqualTo(commentListBack);
        assertThat(commentListBack.getPost()).isEqualTo(post);

        post.commentList(null);
        assertThat(post.getCommentList()).isNull();
        assertThat(commentListBack.getPost()).isNull();
    }
}
