package com.industryx0.financialmeltdownkata.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.industryx0.financialmeltdownkata.domain.FinancedItem;
import com.industryx0.financialmeltdownkata.service.FinancedItemService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.UUID;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class FinancedItemsControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private FinancedItemService service;

    private FinancedItem financedItem;

    @Before
    public void setup() {
        financedItem = new FinancedItem();
        financedItem.setItemName(UUID.randomUUID().toString());
        financedItem.setPrice(new BigDecimal(0));
        service.postFinancedItem(financedItem);
    }

    @Test
    public void getShouldRespondOkWithStoredCustomerDetails() throws Exception {
        mockMvc.perform(get("/financedItems"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(jsonPath("$[0].id").value(financedItem.getId()))
                .andExpect(jsonPath("$[0].itemName").value(financedItem.getItemName()));
    }

    @Test
    public void postShouldRespondWithIdAndStatus201WhenNewItem() throws Exception {
        FinancedItem newFinancedItem = new FinancedItem();
        newFinancedItem.setItemName(UUID.randomUUID().toString());
        newFinancedItem.setPrice(new BigDecimal(0));

        mockMvc.perform(post("/financedItems").contentType(MediaType.APPLICATION_JSON)
                .content(serializeFinancedItem(newFinancedItem)))
                .andExpect(status().isCreated())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(jsonPath("$.id").isNotEmpty());
    }

    public String serializeFinancedItem(FinancedItem financedItem) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(financedItem);
    }
}
