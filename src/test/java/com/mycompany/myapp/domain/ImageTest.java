package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.AlbumTestSamples.*;
import static com.mycompany.myapp.domain.ImageTestSamples.*;
import static com.mycompany.myapp.domain.ParagraphTestSamples.*;
import static com.mycompany.myapp.domain.PersonTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ImageTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Image.class);
        Image image1 = getImageSample1();
        Image image2 = new Image();
        assertThat(image1).isNotEqualTo(image2);

        image2.setId(image1.getId());
        assertThat(image1).isEqualTo(image2);

        image2 = getImageSample2();
        assertThat(image1).isNotEqualTo(image2);
    }

    @Test
    void personTest() {
        Image image = getImageRandomSampleGenerator();
        Person personBack = getPersonRandomSampleGenerator();

        image.setPerson(personBack);
        assertThat(image.getPerson()).isEqualTo(personBack);

        image.person(null);
        assertThat(image.getPerson()).isNull();
    }

    @Test
    void albumTest() {
        Image image = getImageRandomSampleGenerator();
        Album albumBack = getAlbumRandomSampleGenerator();

        image.setAlbum(albumBack);
        assertThat(image.getAlbum()).isEqualTo(albumBack);

        image.album(null);
        assertThat(image.getAlbum()).isNull();
    }

    @Test
    void paragraphTest() {
        Image image = getImageRandomSampleGenerator();
        Paragraph paragraphBack = getParagraphRandomSampleGenerator();

        image.setParagraph(paragraphBack);
        assertThat(image.getParagraph()).isEqualTo(paragraphBack);

        image.paragraph(null);
        assertThat(image.getParagraph()).isNull();
    }
}
