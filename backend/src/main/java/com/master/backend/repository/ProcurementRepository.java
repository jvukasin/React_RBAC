package com.master.backend.repository;

import com.master.backend.enums.Enums;
import com.master.backend.model.Procurement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProcurementRepository extends JpaRepository<Procurement, Long> {

    Procurement findOneById(Long id);

    @Query("select p from Procurement p where p.seller.username = :username or p.procurer.username = :username")
    List<Procurement> findAllForUser(@Param("username") String username);

    Long countByStatus(Enums.ProcurementStatus status);
}
