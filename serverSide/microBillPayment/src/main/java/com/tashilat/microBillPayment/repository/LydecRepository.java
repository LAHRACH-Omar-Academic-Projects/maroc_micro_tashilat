package com.tashilat.microBillPayment.repository;

import com.tashilat.microBillPayment.beans.LydecBillPayment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LydecRepository extends JpaRepository<LydecBillPayment, Long> {
}
