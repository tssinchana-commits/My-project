package com.project.findisc.audit_table.storage;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

public interface FileStorageProvider {

    String saveFile(MultipartFile file) throws IOException;

    Resource getFile(String documentId) throws IOException;
}