package com.master.backend.repository;

import com.master.backend.model.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {

    @Query("select i from Inventory i where i.article.id = :id")
    Inventory findOneByArticle(@Param("id") Long id);
}
