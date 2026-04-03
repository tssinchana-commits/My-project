package com.project.findisc.audit_table.storage;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;

public class FileSystemStorageProvider implements FileStorageProvider {

    private final Path uploadPath = Paths.get("uploads");

    @Override
    public String saveFile(MultipartFile file) throws IOException {

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();

        Files.copy(file.getInputStream(),
                uploadPath.resolve(fileName),
                StandardCopyOption.REPLACE_EXISTING);

        return fileName; // documentId
    }

    @Override
    public Resource getFile(String documentId) throws IOException {
        Path filePath = uploadPath.resolve(documentId);
        return new UrlResource(filePath.toUri());
    }
}