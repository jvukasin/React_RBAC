package com.master.backend.service;

import com.master.backend.dto.ProcurementDTO;
import com.master.backend.dto.ProcurementItemDTO;
import com.master.backend.enums.Enums;
import com.master.backend.model.*;
import com.master.backend.repository.ArticleRepository;
import com.master.backend.repository.ProcurementItemRepository;
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
    ProcurementItemRepository pItemRepo;

    @Autowired
    UserService userService;

    @Autowired
    ArticleRepository articleRepository;

    public ProcurementDTO createProcurement(List<ProcurementItemDTO> items, HttpServletRequest request) {
        User user = userService.getUserFromRequest(request);
        if(user == null) {
            return null;
        }
        LocalDateTime now = LocalDateTime.now();
        Procurement p = new Procurement();
        p.setTimeCreated(now);
        p.setSeller((Seller) user);
        p.setStatus(Enums.ProcurementStatus.ORDERED);
        Set<ProcurementItem> procItems = new HashSet<>();
        p = procurRepo.save(p);
        for(ProcurementItemDTO dto : items) {
            ProcurementItem one = new ProcurementItem();
            one.setQuantity(dto.getQuantity());
            Article article = articleRepository.findOneByName(dto.getName());
            one.setArticle(article);
            one.setProcurement(p);
            pItemRepo.save(one);
            procItems.add(one);
        }
        p.setProcurementItems(procItems);
        p = procurRepo.save(p);

        return returnOneProcurementDTO(p);
    }

    public List<ProcurementDTO> getAllProcurements() {
        List<ProcurementDTO> ret = new ArrayList<>();
        List<Procurement> procurements = procurRepo.findAll();
        for(Procurement p : procurements) {
            ProcurementDTO dto = returnOneProcurementDTO(p);
            ret.add(dto);
        }

        return ret;
    }

    private ProcurementDTO returnOneProcurementDTO(Procurement p) {
        Set<ProcurementItemDTO> items = new HashSet<>();
        for(ProcurementItem i : p.getProcurementItems()) {
            ProcurementItemDTO idto = new ProcurementItemDTO(i.getId(), i.getArticle().getName(), i.getQuantity());
            items.add(idto);
        }
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm");
        String dateCreate = p.getTimeCreated().format(formatter);
        String dateFinish = " ";
        if(p.getTimeFinished() != null) {
            dateFinish = p.getTimeFinished().format(formatter);
        }
        String seller = p.getSeller().getFirstName().concat(" ").concat(p.getSeller().getLastName());
        String procurer = " ";
        if(p.getProcurer() != null) {
            procurer = p.getProcurer().getFirstName().concat(" ").concat(p.getProcurer().getLastName());
        }
        return new ProcurementDTO(p.getId(), dateCreate, dateFinish, p.getStatus(), seller, procurer, items);
    }

    public ProcurementDTO completeProcurement(Long id, HttpServletRequest request) {
        User user = userService.getUserFromRequest(request);
        if(user == null) {
            return null;
        }
        Procurement p = procurRepo.findOneById(id);
        LocalDateTime now = LocalDateTime.now();
        p.setTimeFinished(now);
        p.setProcurer((Procurer) user);
        p.setStatus(Enums.ProcurementStatus.COMPLETED);
        procurRepo.save(p);

        return returnOneProcurementDTO(p);
    }
}
