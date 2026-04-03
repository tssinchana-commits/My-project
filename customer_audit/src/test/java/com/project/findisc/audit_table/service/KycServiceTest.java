package com.project.findisc.audit_table.service;

import com.project.findisc.audit_table.entity.AccountEntity;
import com.project.findisc.audit_table.entity.KycEntity;
import com.project.findisc.audit_table.repository.AccountRepository;
import com.project.findisc.audit_table.repository.KycRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class KycServiceTest {

    @Mock
    private KycRepository kycRepository;

    @Mock
    private AccountRepository accountRepository;

    @InjectMocks
    private KycService kycService;

    @Test
    void saveKyc_success() throws Exception {

        MockMultipartFile photo = new MockMultipartFile(
                "photo",
                "test.jpg",
                "image/jpeg",
                "dummy image".getBytes()
        );

        AccountEntity account = new AccountEntity();
        account.setAccountId(1L); // ✅ FIXED

        when(accountRepository.findById(1L))
                .thenReturn(Optional.of(account));

        KycEntity savedEntity = new KycEntity();
        savedEntity.setId(1L);

        when(kycRepository.save(any(KycEntity.class)))
                .thenReturn(savedEntity);

        KycEntity result = kycService.saveKyc(
                1L,
                "123412341234",
                "ABCDE1234F",
                photo
        );

        assertNotNull(result);
        assertEquals(1L, result.getId());

        verify(accountRepository).findById(1L);
        verify(kycRepository).save(any(KycEntity.class));
    }
}