package com.project.findisc.audit_table.controller;

import com.project.findisc.audit_table.entity.AccountEntity;
import com.project.findisc.audit_table.service.AccountService;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customer/api/v1/accounts")
public class AccountController {

    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

   
    @PostMapping
@ResponseStatus(HttpStatus.CREATED)
public AccountEntity createAccount(@RequestBody AccountEntity account) {
    return accountService.create(account);
}

    @GetMapping
    public List<AccountEntity> getAllAccounts() {
        return accountService.getAll();
    }

    @GetMapping("/{id}")
    public AccountEntity getAccount(@PathVariable Long id) {
        return accountService.getById(id);
    }

    @DeleteMapping("/{id}")
    public String deleteAccount(@PathVariable Long id) {
        accountService.delete(id);
        return "Account deleted successfully";
    }
}