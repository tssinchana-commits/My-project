package com.example.accountservice.controller;

import org.springframework.web.bind.annotation.*;
import com.example.accountservice.entity.Loan;
import com.example.accountservice.service.LoanService;
import java.util.List;

@RestController
@RequestMapping("/loans")
@CrossOrigin(origins = "*")
public class LoanController {

    private final LoanService loanService;

    public LoanController(LoanService loanService) {
        this.loanService = loanService;
    }

    // APPLY LOAN
    @PostMapping
    public Loan applyLoan(@RequestBody Loan loan) {
        return loanService.applyLoan(loan);
    }

    // GET ALL
    @GetMapping
    public List<Loan> getAllLoans() {
        return loanService.getAllLoans();
    }

    // APPROVE
    @PostMapping("/{loanId}/approve")
    public Loan approveLoan(@PathVariable String loanId) {
        return loanService.approveLoan(loanId);
    }

    // REJECT
    @PostMapping("/{loanId}/reject")
    public Loan rejectLoan(@PathVariable String loanId) {
        return loanService.rejectLoan(loanId);
    }

    @PutMapping("/{loanId}/verify")
    public Loan verifyLoan(@PathVariable String loanId) {
        return loanService.verifyLoan(loanId);
    }

    @PutMapping("/{loanId}/disburse")
    public Loan disburseLoan(@PathVariable String loanId) {
        return loanService.disburseLoan(loanId);
    }

    @PutMapping("/{loanId}/close")
    public Loan closeLoan(@PathVariable String loanId) {
        return loanService.closeLoan(loanId);
    }

    // upload and submit documents (representative of document management)
    @PutMapping("/{id}/upload-documents")
    public Loan uploadDocs(@PathVariable String id) {
        return loanService.uploadDocuments(id);
    }

    @PutMapping("/{id}/submit-documents")
    public Loan submitDocs(@PathVariable String id) {
        return loanService.submitDocuments(id);
    }

    // request more documents from customer(verification failure)
    @PutMapping("/{id}/request-documents")
    public Loan requestDocs(@PathVariable String id) {
        return loanService.requestDocuments(id);
    }

    @PutMapping("/{id}/verify")
    public Loan verifyDocs(@PathVariable String id) {
        return loanService.verifyDocuments(id);
    }
}