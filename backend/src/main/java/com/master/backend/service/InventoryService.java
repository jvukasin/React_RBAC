package com.master.backend.service;

import com.master.backend.dto.ArticleDTO;
import com.master.backend.dto.InventoryDTO;
import com.master.backend.model.Inventory;
import com.master.backend.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class InventoryService {

    @Autowired
    InventoryRepository inventRepo;

    public List<InventoryDTO> getInventory() {
        List<Inventory> fetcher = inventRepo.findAll();
        List<InventoryDTO> ret = new ArrayList<>();
        for(Inventory i : fetcher) {
            ArticleDTO aDTO = new ArticleDTO(i.getArticle());
            InventoryDTO dto = new InventoryDTO(i.getId(), i.getQuantity(), aDTO);
            ret.add(dto);
        }

        return ret;
    }

}
