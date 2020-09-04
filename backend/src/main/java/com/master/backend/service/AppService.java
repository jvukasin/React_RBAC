package com.master.backend.service;

import com.master.backend.dto.StatsDTO;
import com.master.backend.enums.Enums;
import com.master.backend.repository.InventoryRepository;
import com.master.backend.repository.ProcurementRepository;
import com.master.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AppService {

    @Autowired
    InventoryRepository inventoryRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ProcurementRepository procurementRepository;

    public StatsDTO getStats() {
        long items = inventoryRepository.count();
        long users = userRepository.count();
        long ordered = procurementRepository.countByStatus(Enums.ProcurementStatus.ORDERED);
        long completed = procurementRepository.countByStatus(Enums.ProcurementStatus.COMPLETED);

        return new StatsDTO(items, users, ordered, completed);
    }
    
}
