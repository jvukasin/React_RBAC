package com.master.backend.service;

import com.master.backend.dto.ProcurementDTO;
import com.master.backend.dto.ProcurementItemDTO;
import com.master.backend.enums.Enums;
import com.master.backend.model.*;
import com.master.backend.repository.ArticleRepository;
import com.master.backend.repository.ProcurementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
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

    public List<ProcurementDTO> getAllProcurements() {
        List<ProcurementDTO> ret = new ArrayList<>();
        List<Procurement> procurements = procurRepo.findAll();
        for(Procurement p : procurements) {
            Set<ProcurementItemDTO> items = new HashSet<>();
            for(ProcurementItem i : p.getProcurementItems()) {
                ProcurementItemDTO idto = new ProcurementItemDTO(i.getId(), i.getArticle().getName(), i.getQuantity());
                items.add(idto);
            }
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm");
            String dateCreate = p.getTimeCreated().format(formatter);
            String dateFinish = p.getTimeFinished().format(formatter);

            String seller = p.getSeller().getFirstName().concat(" ").concat(p.getSeller().getLastName());
            String procurer = p.getProcurer().getFirstName().concat(" ").concat(p.getProcurer().getLastName());
            ProcurementDTO dto = new ProcurementDTO(p.getId(), dateCreate, dateFinish, p.getStatus(), seller, procurer, items);
            ret.add(dto);
        }

        return ret;
    }
}
