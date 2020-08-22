package com.master.backend.repository;

import com.master.backend.model.ProcurementItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProcurementItemRepository extends JpaRepository<ProcurementItem, Long> {
}
