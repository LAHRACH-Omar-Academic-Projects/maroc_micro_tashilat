package com.tashilat.microUserTraces.repository;

import com.tashilat.microUserTraces.models.UserClient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserClientRepository extends JpaRepository<UserClient, Long> {
}
