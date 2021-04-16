package com.tashilat.microBillPayment.web.controllers;

import com.tashilat.microBillPayment.beans.RadeejBillPayment;
import com.tashilat.microBillPayment.repository.RadeejRepository;
import com.tashilat.microBillPayment.web.exceptions.BillPaymentNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/radeej/billPayments")
@CrossOrigin(origins = "*", maxAge = 3600)
public class RadeejController {
    @Autowired
    RadeejRepository radeejRepository;

    @GetMapping(value = "/all")
    public List<RadeejBillPayment> getOrangeRecharges() {
        List<RadeejBillPayment> radeejBillPayments = radeejRepository.findAll();
        return radeejBillPayments;
    }

    @GetMapping(value = "/{id}")
    public Optional<RadeejBillPayment> getBillPayment(@PathVariable Long id)  {
        Optional<RadeejBillPayment> radeejBillPayment = radeejRepository.findById(id);
        if(radeejBillPayment.equals(Optional.empty())) throw new BillPaymentNotFoundException("Le paiement avec l'id " + id + " est INTROUVABLE.");
        return radeejBillPayment;
    }

    @PostMapping(value = "/newBillPayment")
    public ResponseEntity<Void> saveBillPayment(@RequestBody RadeejBillPayment radeejBillPayment) {
        RadeejBillPayment radeejBillPayment1=  radeejRepository.save(radeejBillPayment);
        if(radeejBillPayment == null) {
            return ResponseEntity.noContent().build();
        }
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(radeejBillPayment1.getId())
                .toUri();
        return ResponseEntity.created(location).build();
    }
}