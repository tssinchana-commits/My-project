package com.project.findisc.audit_table.controller;

import com.project.findisc.audit_table.entity.AuditEntity;
import com.project.findisc.audit_table.repository.AuditRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customer/api/v1/audits")
public class AuditController {

    private final AuditRepository auditRepository;

    public AuditController(AuditRepository auditRepository) {
        this.auditRepository = auditRepository;
    }

    @GetMapping
    public List<AuditEntity> getAllAudits() {
        return auditRepository.findAll();
    }

    @GetMapping("/{id}")
    public AuditEntity getAudit(@PathVariable Long id) {
        return auditRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Audit not found"));
    }
}