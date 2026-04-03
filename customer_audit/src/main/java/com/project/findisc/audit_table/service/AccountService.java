package com.project.findisc.audit_table.service;

import com.project.findisc.audit_table.entity.AccountEntity;
import com.project.findisc.audit_table.repository.AccountRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountService {

    private final AccountRepository accountRepository;

    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public AccountEntity create(AccountEntity account) {
        return accountRepository.save(account); // 🔥 CREATE audit
    }

    public List<AccountEntity> getAll() {
        return accountRepository.findAll(); // READ (no audit)
    }

    public AccountEntity getById(Long id) {
        return accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Account not found"));
    }

    public void delete(Long id) {
        accountRepository.deleteById(id); // 🔥 DELETE audit
    }

    public Object createAccount(AccountEntity account) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'createAccount'");
    }
}