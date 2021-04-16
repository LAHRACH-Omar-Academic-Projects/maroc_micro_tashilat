package com.tashilat.microUserTraces.controllers;

import com.tashilat.microUserTraces.exceptions.TransactionNotFoundException;
import com.tashilat.microUserTraces.models.Client;
import com.tashilat.microUserTraces.models.MoneyTransfer;
import com.tashilat.microUserTraces.repository.MoneyTransferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/transactions")
public class MoneyTransferController {
    @Autowired
    MoneyTransferRepository moneyTransferRepository;

    @GetMapping(value = "/{id}")
    public Optional<MoneyTransfer> getTransaction(@PathVariable Long id) throws TransactionNotFoundException {
        Optional<MoneyTransfer> moneyTransfer = moneyTransferRepository.findById(id);
        if(moneyTransfer.equals(Optional.empty())) throw new TransactionNotFoundException("La transaction avec l'id " + id + " est INTROUVABLE.");
        return moneyTransfer;
    }

    @GetMapping(value = "/all/{clientId}")
    public List<MoneyTransfer> getTransactions(@PathVariable Long clientId) {
        Client client = new Client();
        client.setClientId(clientId);
        return moneyTransferRepository.findAllByClient(client);
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

    @DeleteMapping(value = "/deleteTransaction/{transactionId}")
    public boolean deleteTransaction(@PathVariable Long transactionId) {
        try {
            moneyTransferRepository.deleteById(transactionId);
            return true;
        }catch(Exception e) {
            return false;
        }
    }

    @GetMapping(value = "/search/{keyword}")
    public List<MoneyTransfer> getTransactionsByKeyword(@PathVariable String keyword) {
        return moneyTransferRepository.findAllByDateContainingOrTransactionCodeContaining(keyword, keyword);
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
