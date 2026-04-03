package com.project.findisc.audit_table.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.databind.ObjectMapper;

public class EntityJsonUtil {

    private EntityJsonUtil() {

        // prevent instantiation
    }

    private static final ObjectMapper mapper = new ObjectMapper();

    public static String toJson(Object entity) throws JsonProcessingException {
        mapper.registerModule(new JavaTimeModule());
        return mapper.writeValueAsString(entity);
    }
}