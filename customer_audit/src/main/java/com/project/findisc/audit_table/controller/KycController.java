package com.project.findisc.audit_table.controller;

import com.project.findisc.audit_table.service.KycService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/kyc")
public class KycController {

    private final KycService kycService;

    public KycController(KycService kycService) {
        this.kycService = kycService;
    }

    @PostMapping
    public ResponseEntity<String> uploadKyc(
            @RequestParam Long accountId,
            @RequestParam String aadharNumber,
            @RequestParam String panNumber,
            @RequestParam MultipartFile photo
    ) throws Exception {

        kycService.saveKyc(accountId, aadharNumber, panNumber, photo);
        return ResponseEntity.ok("KYC uploaded successfully");
    }
}