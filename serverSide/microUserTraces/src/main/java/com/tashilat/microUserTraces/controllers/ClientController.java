package com.tashilat.microUserTraces.controllers;

import com.tashilat.microUserTraces.models.Client;
import com.tashilat.microUserTraces.models.UserClient;
import com.tashilat.microUserTraces.repository.ClientRepository;
import com.tashilat.microUserTraces.repository.UserClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/clients")
public class ClientController {
    @Autowired
    UserClientRepository userClientRepository;
    @Autowired
    ClientRepository clientRepository;

    @PostMapping(value = "/saveClient")
    public boolean saveClient(@RequestBody UserClient userClient) {
        try {
            clientRepository.save(userClient.getClient());
            userClientRepository.save(userClient);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @GetMapping(value = "/search/{keyword}")
    public List<Client> getClientsByKeyword(@PathVariable String keyword) {
        return clientRepository.findAllByFullNameContainingOrCinContaining(keyword, keyword);
    }

    @DeleteMapping(value = "/deleteClient/{clientId}")
    public boolean deleteClient(@PathVariable Long clientId) {
        try {
            System.out.println(clientId);
            clientRepository.deleteById(clientId);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
