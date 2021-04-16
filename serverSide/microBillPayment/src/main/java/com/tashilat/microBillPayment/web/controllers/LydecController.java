package com.tashilat.microBillPayment.web.controllers;

import com.tashilat.microBillPayment.beans.LydecBillPayment;
import com.tashilat.microBillPayment.repository.LydecRepository;
import com.tashilat.microBillPayment.web.exceptions.BillPaymentNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/lydec/billPayments")
@CrossOrigin(origins = "*", maxAge = 3600)
public class LydecController {
    @Autowired
    LydecRepository lydecRepository;

    @GetMapping(value = "/all")
    public List<LydecBillPayment> getOrangeRecharges() {
        List<LydecBillPayment> lydecBillPayments = lydecRepository.findAll();
        return lydecBillPayments;
    }

    @GetMapping(value = "/{id}")
    public Optional<LydecBillPayment> getBillPayment(@PathVariable Long id)  {
        Optional<LydecBillPayment> lydecBillPayment = lydecRepository.findById(id);
        if(lydecBillPayment.equals(Optional.empty())) throw new BillPaymentNotFoundException("Le paiement avec l'id " + id + " est INTROUVABLE.");
        return lydecBillPayment;
    }

    @PostMapping(value = "/newBillPayment")
    public ResponseEntity<Void> saveBillPayment(@RequestBody LydecBillPayment lydecBillPayment) {
        LydecBillPayment lydecBillPayment1=  lydecRepository.save(lydecBillPayment);
        if(lydecBillPayment == null) {
            return ResponseEntity.noContent().build();
        }
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(lydecBillPayment1.getId())
                .toUri();
        return ResponseEntity.created(location).build();
    }
}