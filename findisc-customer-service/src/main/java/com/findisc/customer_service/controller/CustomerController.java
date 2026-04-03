package com.findisc.customer_service.controller;

import com.findisc.customer_service.entity.Customer;
import com.findisc.customer_service.service.CustomerService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    // 1 REGISTER CUSTOMER
    @PostMapping("/register")
    public Customer registerCustomer(@RequestBody Customer customer) {
        return customerService.registerCustomer(customer);
    }

    // 2 UPLOAD FILE FOR CUSTOMER
    @PostMapping("/{customerId}/upload")
    public String uploadDocument(
            @PathVariable Long customerId,
            @RequestParam("file") MultipartFile file) {

        customerService.getCustomerById(customerId);
        return "File uploaded successfully for customer ID: " + customerId;
    }

    // 3 GET ALL CUSTOMERS
    @GetMapping
    public List<Customer> getAllCustomers() {
        return customerService.getAllCustomers();
    }

    // 4GET CUSTOMER BY ID
    @GetMapping("/{id}")
    public Customer getCustomerById(@PathVariable Long id) {
        return customerService.getCustomerById(id);
    }
}