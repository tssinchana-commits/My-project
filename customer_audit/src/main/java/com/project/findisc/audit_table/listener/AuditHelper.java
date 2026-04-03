package com.project.findisc.audit_table.listener;

import com.project.findisc.audit_table.entity.AuditEntity;
import com.project.findisc.audit_table.repository.AuditRepository;
import org.springframework.stereotype.Component;

@Component
public class AuditHelper {

    private final AuditRepository auditRepository;

    public AuditHelper(AuditRepository auditRepository) {
        this.auditRepository = auditRepository;
    }

    public void save(AuditEntity audit) {
        auditRepository.save(audit);
    }
}