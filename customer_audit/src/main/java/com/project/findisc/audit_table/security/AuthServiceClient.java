package com.project.findisc.audit_table.security;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.util.Map;

@Service
public class AuthServiceClient {

    private final String AUTH_URL = "http://localhost:4000/verify-token";

    public boolean verifyToken(String token) {

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, String> requestBody = Map.of("token", token);

        HttpEntity<Map<String, String>> request = new HttpEntity<>(requestBody, headers);

        try {

            ResponseEntity<Map> response = restTemplate.postForEntity(AUTH_URL, request, Map.class);

            return (Boolean) response.getBody().get("valid");

        } catch (Exception e) {

            return false;

        }

    }
}