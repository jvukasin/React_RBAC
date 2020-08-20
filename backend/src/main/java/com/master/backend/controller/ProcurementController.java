package com.master.backend.controller;

import com.master.backend.dto.ProcurementItemDTO;
import com.master.backend.service.ProcurementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/procurements")
public class ProcurementController {

    @Autowired
    ProcurementService procurService;

    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity<?> createProcurement(@RequestBody List<ProcurementItemDTO> items, HttpServletRequest request) {
        if(procurService.createProcurement(items, request)) {
            return new ResponseEntity<>(HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

}
