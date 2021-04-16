package com.tashilat.microUserTraces.repository;

import com.tashilat.microUserTraces.models.Client;
import com.tashilat.microUserTraces.models.Recharge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RechargeRepository extends JpaRepository<Recharge, Long> {
    List<Recharge> findAllByClient(Client client);
    List<Recharge> findAllByPhoneContainingOrDateContainingOrOperationTypeContaining(String phone, String date, String operationType);
}
