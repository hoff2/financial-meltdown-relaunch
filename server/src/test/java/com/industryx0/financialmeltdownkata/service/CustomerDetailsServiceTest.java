package com.industryx0.financialmeltdownkata.service;

import com.industryx0.financialmeltdownkata.domain.CustomerDetails;
import org.junit.Test;

import java.util.UUID;

import static org.junit.Assert.*;

public class CustomerDetailsServiceTest {
    private CustomerDetailsService customerDetailsService = new CustomerDetailsService();

    @Test
    public void shouldStoreCustomerDetailsAndReturnItLater() {
        CustomerDetails expectedCustomerDetails = new CustomerDetails();
        expectedCustomerDetails.setFirstName(UUID.randomUUID().toString());
        expectedCustomerDetails.setLastName(UUID.randomUUID().toString());

        customerDetailsService.setCustomerDetails(expectedCustomerDetails);

        assertEquals(customerDetailsService.getCustomerDetails(), expectedCustomerDetails);
    }
}