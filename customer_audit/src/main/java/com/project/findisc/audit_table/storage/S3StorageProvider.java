package com.project.findisc.audit_table.storage;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public class S3StorageProvider implements FileStorageProvider {

    @Override
    public String saveFile(MultipartFile file) throws IOException {

        // Upload to AWS S3
        // return generated S3 key
        return "s3-document-id";
    }

    @Override
    public Resource getFile(String documentId) throws IOException {

        // Fetch file from S3
        return null;
    }
}