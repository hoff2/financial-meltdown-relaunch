package com.industryx0.financialmeltdownkata.service;

import com.industryx0.financialmeltdownkata.domain.FinancedItem;
import org.junit.Before;
import org.junit.Test;

import java.math.BigDecimal;
import java.util.Random;
import java.util.UUID;

import static org.junit.Assert.*;

public class FinancedItemServiceTest {
    private FinancedItemService financedItemService = new FinancedItemService();
    private Random rand = new Random();
    private FinancedItem financedItem;

    @Before
    public void setup() {
        financedItem = new FinancedItem();
        financedItem.setItemName(UUID.randomUUID().toString());
        financedItem.setPrice(new BigDecimal(this.randFloat(1.00F, 1000.00F)));
    }

    @Test
    public void shouldAddIdToNewItemWithoutId() {
        FinancedItem updatedItem = financedItemService.postFinancedItem(financedItem);

        assertNotNull(updatedItem.getId());
    }

    @Test
    public void shouldUpdateItemIfItAlreadyExists() {
        FinancedItem createdFinancedItem = financedItemService.postFinancedItem(financedItem);

        FinancedItem financeItemToUpdate = new FinancedItem();
        financeItemToUpdate.setId(createdFinancedItem.getId());
        financeItemToUpdate.setItemName(UUID.randomUUID().toString());
        financeItemToUpdate.setPrice(new BigDecimal("0.00"));

        FinancedItem updatedFinancedItem = financedItemService.postFinancedItem(financeItemToUpdate);

        assertEquals(updatedFinancedItem.getId(), createdFinancedItem.getId());
    }

    @Test
    public void shouldAddPostedItemsToRepository() {
        financedItemService.postFinancedItem(financedItem);

        assertSame(financedItemService.getFinancedItems().get(0), financedItem);
    }

    @Test
    public void shouldCalculateMinimumPaymentWhenNew() {
        FinancedItem financedItemWithPrice = new FinancedItem();
        financedItemWithPrice.setPrice(new BigDecimal("12.00"));

        FinancedItem updatedItem = financedItemService.postFinancedItem(financedItemWithPrice);

        assertEquals(updatedItem.getMinimumPayment(), new BigDecimal("1.00"));
    }

    @Test
    public void shouldCalculateMinimumPaymentWhenExisting() {
        financedItem.setPrice(new BigDecimal("12.00"));

        FinancedItem updatedItem = financedItemService.postFinancedItem(financedItem);

        assertEquals(updatedItem.getMinimumPayment(), new BigDecimal("1.00"));
    }

    @Test
    public void shouldCalculateRateWhenNew() {
        FinancedItem financedItemWithPrice = new FinancedItem();
        financedItemWithPrice.setPrice(new BigDecimal("12.00"));

        FinancedItem updatedItem = financedItemService.postFinancedItem(financedItemWithPrice);

        assertEquals(updatedItem.getRate(), new BigDecimal("1.20"));
    }

    @Test
    public void shouldCalculateRateWhenExisting() {
        financedItem.setPrice(new BigDecimal("12.00"));

        FinancedItem updatedItem = financedItemService.postFinancedItem(financedItem);

        assertEquals(updatedItem.getRate(), new BigDecimal("1.20"));
    }

    private float randFloat(float min, float max) {
        return this.rand.nextFloat() * (max - min) + min;
    }
}