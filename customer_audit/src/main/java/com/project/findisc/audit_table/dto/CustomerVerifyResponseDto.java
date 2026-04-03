package com.project.findisc.audit_table.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomerVerifyResponseDto {
    private boolean success;
    private String customerId;
    private String message;
}