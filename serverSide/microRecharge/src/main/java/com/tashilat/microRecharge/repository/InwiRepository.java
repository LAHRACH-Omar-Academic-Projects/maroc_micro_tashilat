package com.tashilat.microRecharge.repository;

import com.tashilat.microRecharge.beans.InwiRecharge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InwiRepository extends JpaRepository<InwiRecharge, Long> {
}
