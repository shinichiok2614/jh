package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Category;
import java.util.Collections;
import org.springframework.kafka.support.converter.JsonMessageConverter;
import org.springframework.kafka.support.mapping.DefaultJackson2JavaTypeMapper;
import org.springframework.kafka.support.mapping.Jackson2JavaTypeMapper;
import org.springframework.stereotype.Component;

@Component
public class CategoryMessageConverter extends JsonMessageConverter {

    public CategoryMessageConverter() {
        super();
        DefaultJackson2JavaTypeMapper typeMapper = new DefaultJackson2JavaTypeMapper();
        typeMapper.setTypePrecedence(Jackson2JavaTypeMapper.TypePrecedence.TYPE_ID);
        typeMapper.addTrustedPackages("com.mycompany.myapp");
        typeMapper.setIdClassMapping(Collections.singletonMap("category", Category.class));
        this.setTypeMapper(typeMapper);
    }
}
