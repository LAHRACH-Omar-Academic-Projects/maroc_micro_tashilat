package com.tashilat.microUserTraces.controllers;

import com.tashilat.microUserTraces.exceptions.BillPaymentNotFoundException;
import com.tashilat.microUserTraces.models.Client;
import com.tashilat.microUserTraces.models.BillPayment;
import com.tashilat.microUserTraces.repository.BillPaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/billPayments")
public class BillPaymentController {
    @Autowired
    BillPaymentRepository billPaymentRepository;

    @GetMapping(value = "/{id}")
    public Optional<BillPayment> getBillPayment(@PathVariable Long id) throws BillPaymentNotFoundException {
        Optional<BillPayment> billPayment = billPaymentRepository.findById(id);
        if(billPayment.equals(Optional.empty())) throw new BillPaymentNotFoundException("La facture avec l'id " + id + " est INTROUVABLE.");
        return billPayment;
    }

    @GetMapping(value = "/all/{clientId}")
    public List<BillPayment> getBillPayments(@PathVariable Long clientId) {
        Client client = new Client();
        client.setClientId(clientId);
        return billPaymentRepository.findAllByClient(client);
    }

    @PostMapping(value = "/saveBillPayment")
    public ResponseEntity<Void> saveBillPayment(@RequestBody BillPayment billPayment) {
        BillPayment billPayment1 =  billPaymentRepository.save(billPayment);
        if(billPayment == null) {
            return ResponseEntity.noContent().build();
        }
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(billPayment1.getId())
                .toUri();
        return ResponseEntity.created(location).build();
    }

    @DeleteMapping(value = "/deleteBillPayment/{billPaymentId}")
    public boolean deleteBillPayment(@PathVariable Long billPaymentId) {
        try {
            billPaymentRepository.deleteById(billPaymentId);
            return true;
        }catch(Exception e) {
            return false;
        }
    }

    @GetMapping(value = "/search/{keyword}")
    public List<BillPayment> getBillPaymentsByKeyword(@PathVariable String keyword) {
        return billPaymentRepository.findAllByMethodContainingOrDateContainingOrServiceContaining(keyword, keyword, keyword);
    }

    @PutMapping(value = "/addToFavorite")
    public boolean addToFavorite(@RequestBody BillPayment billPayment) {
        try {
            System.out.println(billPayment);
            billPaymentRepository.save(billPayment);
            return true;
        }catch (Exception e) {
            return false;
        }
    }
}
