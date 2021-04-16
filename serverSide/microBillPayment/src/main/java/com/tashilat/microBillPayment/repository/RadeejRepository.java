package com.tashilat.microBillPayment.repository;

import com.tashilat.microBillPayment.beans.RadeejBillPayment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RadeejRepository extends JpaRepository<RadeejBillPayment, Long> {
}
