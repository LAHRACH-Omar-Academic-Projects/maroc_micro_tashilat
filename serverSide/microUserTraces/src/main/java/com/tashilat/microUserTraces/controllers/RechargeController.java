package com.tashilat.microUserTraces.controllers;

import com.tashilat.microUserTraces.exceptions.RechargeNotFoundException;
import com.tashilat.microUserTraces.models.Client;
import com.tashilat.microUserTraces.models.Recharge;
import com.tashilat.microUserTraces.repository.RechargeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/recharges")
public class RechargeController {
    @Autowired
    RechargeRepository rechargeRepository;

    @GetMapping(value = "/{id}")
    public Optional<Recharge> getRecharge(@PathVariable Long id) throws RechargeNotFoundException {
        Optional<Recharge> recharge = rechargeRepository.findById(id);
        if(recharge.equals(Optional.empty())) throw new RechargeNotFoundException("Le recharge avec l'id " + id + " est INTROUVABLE.");
        return recharge;
    }

    @GetMapping(value = "/all/{clientId}")
    public List<Recharge> getRecharges(@PathVariable Long clientId) {
        Client client = new Client();
        client.setClientId(clientId);
        return rechargeRepository.findAllByClient(client);
    }

    @PostMapping(value = "/saveRecharge")
    public ResponseEntity<Void> saveRecharge(@RequestBody Recharge recharge) {
        Recharge recharge1 =  rechargeRepository.save(recharge);
        if(recharge == null) {
            return ResponseEntity.noContent().build();
        }
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(recharge1.getId())
                .toUri();
        return ResponseEntity.created(location).build();
    }

    @DeleteMapping(value = "/deleteRecharge/{rechargeId}")
    public boolean deleteRecharge(@PathVariable Long rechargeId) {
        try {
            rechargeRepository.deleteById(rechargeId);
            return true;
        }catch(Exception e) {
            return false;
        }
    }

    @GetMapping(value = "/search/{keyword}")
    public List<Recharge> getRechargesByKeyword(@PathVariable String keyword) {
        return rechargeRepository.findAllByPhoneContainingOrDateContainingOrOperationTypeContaining(keyword, keyword, keyword);
    }

    @PutMapping(value = "/addToFavorite")
    public boolean addToFavorite(@RequestBody Recharge recharge) {
        try {
             System.out.println(recharge);
             rechargeRepository.save(recharge);
             return true;
        }catch (Exception e) {
            return false;
        }
    }
}
