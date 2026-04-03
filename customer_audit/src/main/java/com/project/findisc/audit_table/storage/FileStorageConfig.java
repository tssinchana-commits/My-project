package com.project.findisc.audit_table.storage;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FileStorageConfig {

    @Value("${storage.type}")
    private String storageType;

    @Bean
    public FileStorageProvider fileStorageProvider() {

        if ("s3".equalsIgnoreCase(storageType)) {
            return new S3StorageProvider();
        }

        return new FileSystemStorageProvider();
    }
}