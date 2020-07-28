package com.master.backend.repository;

import com.master.backend.model.Temp;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TempRepository extends JpaRepository<Temp, Long> {

}
