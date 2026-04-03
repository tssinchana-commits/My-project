package com.project.findisc.audit_table.repository;

import com.project.findisc.audit_table.entity.KycEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KycRepository extends JpaRepository<KycEntity, Long> {
}