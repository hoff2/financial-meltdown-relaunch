package com.industryx0.financialmeltdownkata.controller;

import com.industryx0.financialmeltdownkata.domain.CustomerDetails;
import com.industryx0.financialmeltdownkata.service.CustomerDetailsService;
import org.json.JSONObject;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.UUID;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class CustomerDetailsControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private CustomerDetailsService service;

    private CustomerDetails expected;

    private String expectedFirstName;
    private String expectedLastName;
    private String expectedStreetAddress;
    private String expectedCity;
    private String expectedState;
    private String expectedPhone;
    private String expectedEmail;

    @Before
    public void setup() {
        expected = new CustomerDetails();

        expectedFirstName = UUID.randomUUID().toString();
        expectedLastName = UUID.randomUUID().toString();
        expectedStreetAddress = UUID.randomUUID().toString();
        expectedCity = UUID.randomUUID().toString();
        expectedState = UUID.randomUUID().toString();
        expectedPhone = UUID.randomUUID().toString();
        expectedEmail = UUID.randomUUID().toString();

        expected.setFirstName(expectedFirstName);
        expected.setLastName(expectedLastName);
        expected.setStreetAddress(expectedStreetAddress);
        expected.setCity(expectedCity);
        expected.setState(expectedState);
        expected.setPhone(expectedPhone);
        expected.setEmail(expectedEmail);
    }

    @Test
    public void getShouldRespondOkWithStoredCustomerDetails() throws Exception {
        service.setCustomerDetails(expected);

        mockMvc.perform(get("/customerDetails"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(jsonPath("$.firstName").value(expectedFirstName))
                .andExpect(jsonPath("$.lastName").value(expectedLastName))
                .andExpect(jsonPath("$.streetAddress").value(expectedStreetAddress))
                .andExpect(jsonPath("$.city").value(expectedCity))
                .andExpect(jsonPath("$.state").value(expectedState))
                .andExpect(jsonPath("$.phone").value(expectedPhone))
                .andExpect(jsonPath("$.email").value(expectedEmail));
    }

    @Test
    public void postShouldRespondOkWithPostedCustomerDetails() throws Exception {
        String expectedFirstName = UUID.randomUUID().toString();

        mockMvc.perform(post("/customerDetails").contentType(MediaType.APPLICATION_JSON)
                .content(String.format("{\"firstName\": \"%s\"}", expectedFirstName)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(jsonPath("$.firstName").value(expectedFirstName));
    }

    @Test
    public void shouldSaveAndRespondWithSameCustomerDetails() throws Exception {
        String expectedFirstName = UUID.randomUUID().toString();

        mockMvc.perform(post("/customerDetails").contentType(MediaType.APPLICATION_JSON)
                .content(String.format("{\"firstName\": \"%s\"}", expectedFirstName)))
                .andExpect(status().isOk());

        mockMvc.perform(get("/customerDetails"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.firstName").value(expectedFirstName));
    }
}
