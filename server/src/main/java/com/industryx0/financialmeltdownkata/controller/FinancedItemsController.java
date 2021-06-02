package com.industryx0.financialmeltdownkata.controller;

import com.industryx0.financialmeltdownkata.domain.FinancedItem;
import com.industryx0.financialmeltdownkata.service.FinancedItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8_VALUE;

@RestController
@RequestMapping(path = "/financedItems")
public class FinancedItemsController {

    @Autowired
    FinancedItemService financedItemsService;

    @GetMapping(produces = APPLICATION_JSON_UTF8_VALUE)
    public ArrayList<FinancedItem> getFinancedItems() {
        return financedItemsService.getFinancedItems();
    }

    @RequestMapping(method = RequestMethod.POST, produces = "application/json")
    public ResponseEntity<FinancedItem> validateUser(@RequestBody FinancedItem financedItem) {
        boolean created = financedItem.getId() == null;
        FinancedItem updatedFinancedItem = financedItemsService.postFinancedItem(financedItem);

        return new ResponseEntity<>(updatedFinancedItem, created ? HttpStatus.CREATED : HttpStatus.OK);
    }
}
