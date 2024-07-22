package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.CommentTestSamples.*;
import static com.mycompany.myapp.domain.DepartmentTestSamples.*;
import static com.mycompany.myapp.domain.ImageTestSamples.*;
import static com.mycompany.myapp.domain.MessageTestSamples.*;
import static com.mycompany.myapp.domain.PersonTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class PersonTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Person.class);
        Person person1 = getPersonSample1();
        Person person2 = new Person();
        assertThat(person1).isNotEqualTo(person2);

        person2.setId(person1.getId());
        assertThat(person1).isEqualTo(person2);

        person2 = getPersonSample2();
        assertThat(person1).isNotEqualTo(person2);
    }

    @Test
    void departmentTest() {
        Person person = getPersonRandomSampleGenerator();
        Department departmentBack = getDepartmentRandomSampleGenerator();

        person.setDepartment(departmentBack);
        assertThat(person.getDepartment()).isEqualTo(departmentBack);

        person.department(null);
        assertThat(person.getDepartment()).isNull();
    }

    @Test
    void imageTest() {
        Person person = getPersonRandomSampleGenerator();
        Image imageBack = getImageRandomSampleGenerator();

        person.setImage(imageBack);
        assertThat(person.getImage()).isEqualTo(imageBack);
        assertThat(imageBack.getPerson()).isEqualTo(person);

        person.image(null);
        assertThat(person.getImage()).isNull();
        assertThat(imageBack.getPerson()).isNull();
    }

    @Test
    void commentTest() {
        Person person = getPersonRandomSampleGenerator();
        Comment commentBack = getCommentRandomSampleGenerator();

        person.setComment(commentBack);
        assertThat(person.getComment()).isEqualTo(commentBack);
        assertThat(commentBack.getPerson()).isEqualTo(person);

        person.comment(null);
        assertThat(person.getComment()).isNull();
        assertThat(commentBack.getPerson()).isNull();
    }

    @Test
    void messageTest() {
        Person person = getPersonRandomSampleGenerator();
        Message messageBack = getMessageRandomSampleGenerator();

        person.setMessage(messageBack);
        assertThat(person.getMessage()).isEqualTo(messageBack);
        assertThat(messageBack.getSender()).isEqualTo(person);

        person.message(null);
        assertThat(person.getMessage()).isNull();
        assertThat(messageBack.getSender()).isNull();
    }
}
