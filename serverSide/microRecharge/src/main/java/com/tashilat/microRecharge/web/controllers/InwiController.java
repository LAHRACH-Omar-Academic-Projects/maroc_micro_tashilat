package com.tashilat.microRecharge.web.controllers;

import com.tashilat.microRecharge.beans.InwiRecharge;
import com.tashilat.microRecharge.repository.InwiRepository;
import com.tashilat.microRecharge.web.exceptions.RechargeNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("inwi/recharges")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class InwiController {
    @Autowired
    InwiRepository inwiRepository;

    @GetMapping(value = "/all")
    public List<InwiRecharge> getInwiRecharges() {
        List<InwiRecharge> inwiRecharges = inwiRepository.findAll();
        return inwiRecharges;
    }

    @GetMapping(value = "/{id}")
    public Optional<InwiRecharge> getInwiRecharge(@PathVariable Long id) throws RechargeNotFoundException {
        Optional<InwiRecharge> inwiRecharge = inwiRepository.findById(id);
        if(inwiRecharge.equals(Optional.empty())) throw new RechargeNotFoundException("Le recharge avec l'id " + id + " est INTROUVABLE.");
        return inwiRecharge;
    }

    @PostMapping(value = "/newRecharge")
    public ResponseEntity<Void> saveInwiRecharge(@RequestBody InwiRecharge inwiRecharge) {
        InwiRecharge inwiRecharge1 =  inwiRepository.save(inwiRecharge);
        if(inwiRecharge == null) {
            return ResponseEntity.noContent().build();
        }
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(inwiRecharge1.getId())
                .toUri();
        return ResponseEntity.created(location).build();
    }
}
