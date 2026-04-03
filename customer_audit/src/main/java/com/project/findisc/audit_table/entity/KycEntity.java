package com.project.findisc.audit_table.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "kyc")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class KycEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    private AccountEntity account;

    @Column(nullable = false)
    private String aadharNumber;

    @Column(nullable = false)
    private String panNumber;

    @Lob
    private byte[] photo;
}