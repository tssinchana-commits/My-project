package com.project.findisc.audit_table.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "audit_table")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuditEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String entityType;
    private Long entityId;
    private String action;
    private String reason;

    @Column(columnDefinition = "TEXT")
    private String data;

    private LocalDateTime createdAt;
}