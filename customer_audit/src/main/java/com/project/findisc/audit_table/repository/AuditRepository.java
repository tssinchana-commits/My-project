package com.project.findisc.audit_table.repository;

import com.project.findisc.audit_table.entity.AuditEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuditRepository extends JpaRepository<AuditEntity, Long> {
}