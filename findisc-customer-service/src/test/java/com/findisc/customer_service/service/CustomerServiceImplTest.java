package com.findisc.customer_service.service;

import com.findisc.customer_service.entity.Customer;
import com.findisc.customer_service.exception.CustomerNotFoundException;
import com.findisc.customer_service.repository.CustomerRepository;

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
class CustomerServiceImplTest {

    @Mock
    private CustomerRepository customerRepository;

    @InjectMocks
    private CustomerServiceImpl customerService;

    // Test 1: registerCustomer
    @Test
    void registerCustomer_success() {
        Customer customer = new Customer();
        customer.setFirstName("Sinchana");

        when(customerRepository.save(customer)).thenReturn(customer);

        Customer savedCustomer = customerService.registerCustomer(customer);

        assertNotNull(savedCustomer);
        assertEquals("Sinchana", savedCustomer.getFirstName());
        verify(customerRepository, times(1)).save(customer);
    }

    // Test 2: getAllCustomers
    @Test
    void getAllCustomers_success() {
        when(customerRepository.findAll())
                .thenReturn(List.of(new Customer(), new Customer()));

        List<Customer> customers = customerService.getAllCustomers();

        assertEquals(2, customers.size());
        verify(customerRepository, times(1)).findAll();
    }

    // Test 3: getCustomerById success
    @Test
    void getCustomerById_success() {
        Customer customer = new Customer();
        customer.setId(1L);

        when(customerRepository.findById(1L))
                .thenReturn(Optional.of(customer));

        Customer result = customerService.getCustomerById(1L);

        assertNotNull(result);
        assertEquals(1L, result.getId());
    }

    // Test 4: getCustomerById not found
    @Test
    void getCustomerById_notFound() {
        when(customerRepository.findById(1L))
                .thenReturn(Optional.empty());

        assertThrows(CustomerNotFoundException.class,
                () -> customerService.getCustomerById(1L));
    }
}