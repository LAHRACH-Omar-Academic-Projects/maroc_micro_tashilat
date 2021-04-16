package com.tashilat.microMoneyTransfer.web.controllers;

import com.tashilat.microMoneyTransfer.beans.MoneyTransfer;
import com.tashilat.microMoneyTransfer.repository.MoneyTransferRepository;
import com.tashilat.microMoneyTransfer.web.exceptions.TransactionNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/moneyTransfer/transactions")
@CrossOrigin(origins = "*", maxAge = 3600)
public class MoneyTransferController {
    @Autowired
    MoneyTransferRepository moneyTransferRepository;

    @GetMapping(value = "/all")
    public List<MoneyTransfer> getOrangeRecharges() {
        List<MoneyTransfer> moneyTransfers = moneyTransferRepository.findAll();
        return moneyTransfers;
    }

    @GetMapping(value = "/{id}")
    public Optional<MoneyTransfer> getTransaction(@PathVariable Long id) throws TransactionNotFoundException {
        Optional<MoneyTransfer> moneyTransfer = moneyTransferRepository.findById(id);
        if(moneyTransfer.equals(Optional.empty())) throw new TransactionNotFoundException("Le recharge avec l'id " + id + " est INTROUVABLE.");
        return moneyTransfer;
    }

    @PostMapping(value = "/saveTransaction")
    public ResponseEntity<Void> saveTransaction(@RequestBody MoneyTransfer moneyTransfer) {
        MoneyTransfer moneyTransfer1 =  moneyTransferRepository.save(moneyTransfer);
        if(moneyTransfer == null) {
            return ResponseEntity.noContent().build();
        }
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(moneyTransfer1.getId())
                .toUri();
        return ResponseEntity.created(location).build();
    }

    @PutMapping(value = "/addToFavorite")
    public boolean addToFavorite(@RequestBody MoneyTransfer moneyTransfer) {
        try {
            moneyTransferRepository.save(moneyTransfer);
            return true;
        }catch (Exception e) {
            return false;
        }
    }
}
