package com.project.findisc.audit_table.service;

import com.project.findisc.audit_table.entity.AccountEntity;
import com.project.findisc.audit_table.repository.AccountRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AccountServiceTest {

    @Mock
    private AccountRepository accountRepository;

    @InjectMocks
    private AccountService accountService;

    @Test
    void createAccount_success() {
        AccountEntity account = new AccountEntity(
                1L,
                "ACC1001",
                "Goutham",
                "Mysore", null);

        when(accountRepository.save(any(AccountEntity.class)))
                .thenReturn(account);

        AccountEntity saved = accountService.create(account);

        assertNotNull(saved);
        assertEquals("ACC1001", saved.getAccountNumber());
        verify(accountRepository, times(1)).save(account);
    }

    @Test
    void getAllAccounts_success() {
        when(accountRepository.findAll())
                .thenReturn(List.of(new AccountEntity()));

        List<AccountEntity> accounts = accountService.getAll();

        assertEquals(1, accounts.size());
    }

    @Test
    void getAccountById_success() {
        AccountEntity account = new AccountEntity(
                1L, "ACC1001", "Goutham", "Mysore", null);

        when(accountRepository.findById(1L))
                .thenReturn(Optional.of(account));

        AccountEntity result = accountService.getById(1L);

        assertEquals("Goutham", result.getAccountHolderName());
    }

    @Test
    void getAccountById_notFound() {
        when(accountRepository.findById(1L))
                .thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(
                RuntimeException.class,
                () -> accountService.getById(1L));

        assertEquals("Account not found", ex.getMessage());
    }

    @Test
    void deleteAccount_success() {
        doNothing().when(accountRepository).deleteById(1L);

        accountService.delete(1L);

        verify(accountRepository, times(1)).deleteById(1L);
    }
}