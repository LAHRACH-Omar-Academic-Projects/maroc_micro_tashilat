package com.tashilat.microUserTraces.controllers;

import com.tashilat.microUserTraces.exceptions.UserNotFoundException;
import com.tashilat.microUserTraces.models.User;
import com.tashilat.microUserTraces.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    UserRepository userRepository;

    @PostMapping(value = "/saveUser")
    public boolean saveUser(@RequestBody User user) {
        try {
            userRepository.save(user);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @GetMapping(value = "/{id}")
    public Optional<User> getUser(@PathVariable Long id) throws UserNotFoundException {
        Optional<User> user = userRepository.findById(id);
        if(user.equals(Optional.empty())) throw new UserNotFoundException("L'utilisateur avec l'id " + id + " est INTROUVABLE.");
        return user;
    }

    @GetMapping(value = "/search/{keyword}")
    public List<User> getUsersByKeyword(@PathVariable String keyword) {
        return userRepository.findAllByUsernameContainingOrAgencyNameContaining(keyword, keyword);
    }

    @GetMapping(value = "/all")
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @DeleteMapping(value = "/deleteUser/{userId}")
    public boolean deleteUser(@PathVariable Long userId) {
        try {
            userRepository.deleteById(userId);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
