package com.tashilat.microRecharge.repository;

import com.tashilat.microRecharge.beans.OrangeRecharge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrangeRepository extends JpaRepository<OrangeRecharge, Long> {
}
