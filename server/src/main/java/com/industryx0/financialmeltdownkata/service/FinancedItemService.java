package com.industryx0.financialmeltdownkata.service;

import com.industryx0.financialmeltdownkata.domain.FinancedItem;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.UUID;

@Service
public class FinancedItemService {
    private HashMap<String, FinancedItem> financedItems = new HashMap<>();

    final private BigDecimal PAYMENT_TERM = new BigDecimal(12);
    final private BigDecimal INTEREST_DIVISOR = new BigDecimal(10);

    public FinancedItem postFinancedItem(FinancedItem financedItem) {
        if (financedItem.getId() == null || !financedItems.containsKey(financedItem.getId())) {
            String id = UUID.randomUUID().toString();
            financedItem.setId(id);
        }

        financedItem.setMinimumPayment(financedItem.getPrice().divide(this.PAYMENT_TERM, RoundingMode.HALF_DOWN));
        financedItem.setRate(financedItem.getPrice().divide(this.INTEREST_DIVISOR, RoundingMode.HALF_DOWN));

        financedItems.put(financedItem.getId(), financedItem);
        return financedItem;
    }

    public ArrayList<FinancedItem> getFinancedItems(){
        return new ArrayList(financedItems.values());
    }
}
