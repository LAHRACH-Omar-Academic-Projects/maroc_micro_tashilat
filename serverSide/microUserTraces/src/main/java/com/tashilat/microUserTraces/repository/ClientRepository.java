package com.tashilat.microUserTraces.repository;

import com.tashilat.microUserTraces.models.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {
    List<Client> findAllByFullNameContainingOrCinContaining(String fullName, String cin);
}
