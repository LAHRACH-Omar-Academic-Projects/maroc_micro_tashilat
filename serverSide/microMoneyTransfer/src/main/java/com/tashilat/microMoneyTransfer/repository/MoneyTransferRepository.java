package com.tashilat.microMoneyTransfer.repository;

import com.tashilat.microMoneyTransfer.beans.MoneyTransfer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MoneyTransferRepository extends JpaRepository<MoneyTransfer, Long> {
}
