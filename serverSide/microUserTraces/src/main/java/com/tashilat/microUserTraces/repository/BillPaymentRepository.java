package com.tashilat.microUserTraces.repository;

import com.tashilat.microUserTraces.models.BillPayment;
import com.tashilat.microUserTraces.models.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BillPaymentRepository extends JpaRepository<BillPayment, Long> {
    List<BillPayment> findAllByClient(Client client);
    List<BillPayment> findAllByMethodContainingOrDateContainingOrServiceContaining(String method, String date, String service);
}
