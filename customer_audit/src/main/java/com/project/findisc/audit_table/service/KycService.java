package com.project.findisc.audit_table.service;

import com.project.findisc.audit_table.entity.AccountEntity;
import com.project.findisc.audit_table.entity.KycEntity;
import com.project.findisc.audit_table.repository.AccountRepository;
import com.project.findisc.audit_table.repository.KycRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class KycService {

    private final KycRepository kycRepository;
    private final AccountRepository accountRepository;

    public KycService(KycRepository kycRepository, AccountRepository accountRepository) {
        this.kycRepository = kycRepository;
        this.accountRepository = accountRepository;
    }

    public KycEntity saveKyc(
            Long accountId,
            String aadharNumber,
            String panNumber,
            MultipartFile photo
    ) throws Exception {

        AccountEntity account = accountRepository.findById(accountId)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        KycEntity kyc = new KycEntity();
        kyc.setAccount(account);
        kyc.setAadharNumber(aadharNumber);
        kyc.setPanNumber(panNumber);
        kyc.setPhoto(photo.getBytes());

        return kycRepository.save(kyc);
    }
}