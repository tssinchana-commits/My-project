package com.findisc.customer_service.service;

import com.findisc.customer_service.entity.Customer;

import java.util.List;

public interface CustomerService {

    Customer registerCustomer(Customer customer);

    List<Customer> getAllCustomers();

    Customer getCustomerById(Long id);
}