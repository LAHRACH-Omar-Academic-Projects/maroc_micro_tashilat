package com.tashilat.microUserTraces.repository;

import com.tashilat.microUserTraces.models.Client;
import com.tashilat.microUserTraces.models.MoneyTransfer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MoneyTransferRepository extends JpaRepository<MoneyTransfer, Long> {
    List<MoneyTransfer> findAllByClient(Client client);
    List<MoneyTransfer> findAllByDateContainingOrTransactionCodeContaining(
            String date,
            String transactionCode);
}
