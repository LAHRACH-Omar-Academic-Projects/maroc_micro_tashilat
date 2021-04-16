package com.tashilat.microRecharge.web.controllers;

import com.tashilat.microRecharge.beans.IamRecharge;
import com.tashilat.microRecharge.repository.IamRepository;
import com.tashilat.microRecharge.web.exceptions.RechargeNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/iam/recharges")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class IamController {
    @Autowired
    IamRepository iamRepository;

    @GetMapping(value = "/all")
    public List<IamRecharge> getIamRecharges() {
        List<IamRecharge> iamRecharges = iamRepository.findAll();
        return iamRecharges;
    }

    @GetMapping(value = "/{id}")
    public Optional<IamRecharge> getIamRecharge(@PathVariable Long id) throws RechargeNotFoundException {
        Optional<IamRecharge> iamRecharge = iamRepository.findById(id);
        if(iamRecharge.equals(Optional.empty())) throw new RechargeNotFoundException("Le recharge avec l'id " + id + " est INTROUVABLE.");
        return iamRecharge;
    }

    @PostMapping(value = "/newRecharge")
    public ResponseEntity<Void> saveIamRecharge(@RequestBody IamRecharge iamRecharge) {
        IamRecharge iamRecharge1 =  iamRepository.save(iamRecharge);
        if(iamRecharge == null) {
            return ResponseEntity.noContent().build();
        }
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(iamRecharge1.getId())
                .toUri();
        return ResponseEntity.created(location).build();
    }
}
