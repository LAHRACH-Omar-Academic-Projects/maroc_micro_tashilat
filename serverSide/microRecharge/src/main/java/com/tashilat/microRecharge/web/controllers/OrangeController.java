package com.tashilat.microRecharge.web.controllers;

import com.tashilat.microRecharge.beans.OrangeRecharge;
import com.tashilat.microRecharge.repository.OrangeRepository;
import com.tashilat.microRecharge.web.exceptions.RechargeNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("orange/recharges")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class OrangeController {
    @Autowired
    OrangeRepository orangeRepository;

    @GetMapping(value = "/all")
    public List<OrangeRecharge> getOrangeRecharges() {
        List<OrangeRecharge> orangeRecharges = orangeRepository.findAll();
        return orangeRecharges;
    }

    @GetMapping(value = "/{id}")
    public Optional<OrangeRecharge> getOrangeRecharge(@PathVariable Long id) throws RechargeNotFoundException {
        Optional<OrangeRecharge> orangeRecharge = orangeRepository.findById(id);
        if(orangeRecharge.equals(Optional.empty())) throw new RechargeNotFoundException("Le recharge avec l'id " + id + " est INTROUVABLE.");
        return orangeRecharge;
    }

    @PostMapping(value = "/newRecharge")
    public ResponseEntity<Void> saveOrangeRecharge(@RequestBody OrangeRecharge orangeRecharge) {
        OrangeRecharge orangeRecharge1 =  orangeRepository.save(orangeRecharge);
        if(orangeRecharge == null) {
            return ResponseEntity.noContent().build();
        }
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(orangeRecharge1.getId())
                .toUri();
        return ResponseEntity.created(location).build();
    }
}
