package com.industryx0.financialmeltdownkata.service;

import com.industryx0.financialmeltdownkata.domain.CustomerDetails;
import org.springframework.stereotype.Service;

@Service
public class CustomerDetailsService {
    private CustomerDetails customerDetails;

    public CustomerDetails getCustomerDetails() {
        return this.customerDetails;
    }

    public CustomerDetails setCustomerDetails(CustomerDetails customerDetails) {
        this.customerDetails = customerDetails;
        return this.customerDetails;
    }
}
