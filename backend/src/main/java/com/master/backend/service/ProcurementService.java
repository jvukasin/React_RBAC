package com.master.backend.service;

import com.master.backend.dto.ProcurementItemDTO;
import com.master.backend.enums.Enums;
import com.master.backend.model.*;
import com.master.backend.repository.ArticleRepository;
import com.master.backend.repository.ProcurementRepository;
import com.master.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class ProcurementService {

    @Autowired
    ProcurementRepository procurRepo;

    @Autowired
    UserService userService;

    @Autowired
    ArticleRepository articleRepository;

    public boolean createProcurement(List<ProcurementItemDTO> items, HttpServletRequest request) {
        User user = userService.getUserFromRequest(request);
        if(user == null) {
            return false;
        }
        LocalDateTime now = LocalDateTime.now();
        Procurement p = new Procurement();
        p.setTimeCreated(now);
        p.setSeller((Seller) user);
        p.setStatus(Enums.ProcurementStatus.ORDERED);
        Set<ProcurementItem> procItems = new HashSet<>();
        for(ProcurementItemDTO dto : items) {
            ProcurementItem one = new ProcurementItem();
            one.setQuantity(dto.getQuantity());
            Article article = articleRepository.findOneByName(dto.getName());
            one.setArticle(article);
            procItems.add(one);

        }
        p.setProcurementItems(procItems);

        procurRepo.save(p);

        return true;
    }
}
