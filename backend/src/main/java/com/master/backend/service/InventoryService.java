package com.master.backend.service;

import com.master.backend.dto.ArticleDTO;
import com.master.backend.dto.InventoryDTO;
import com.master.backend.model.Inventory;
import com.master.backend.model.ProcurementItem;
import com.master.backend.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

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

    public void updateItems(Set<ProcurementItem> items) {
        ArrayList<ProcurementItem> list = new ArrayList<>(items);
        for(ProcurementItem p : list) {
            Inventory i = inventRepo.findOneByArticle(p.getArticle().getId());
            int current = i.getQuantity();
            current += p.getQuantity();
            i.setQuantity(current);
            inventRepo.save(i);
        }
    }

    public InventoryDTO changeItem(InventoryDTO dto) {
        Inventory i = inventRepo.findOneByArticle(dto.getArticleDTO().getId());
        i.setQuantity(dto.getQuantity());
        inventRepo.save(i);
        return dto;
    }
}
