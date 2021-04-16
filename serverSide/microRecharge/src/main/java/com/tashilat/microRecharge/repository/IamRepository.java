package com.tashilat.microRecharge.repository;

import com.tashilat.microRecharge.beans.IamRecharge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IamRepository extends JpaRepository<IamRecharge, Long> {
}
