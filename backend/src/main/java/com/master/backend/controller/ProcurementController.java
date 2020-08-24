package com.master.backend.controller;

import com.master.backend.dto.ProcurementDTO;
import com.master.backend.dto.ProcurementItemDTO;
import com.master.backend.service.ProcurementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/procurements")
public class ProcurementController {

    @Autowired
    ProcurementService procurService;

    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity<ProcurementDTO> createProcurement(@RequestBody List<ProcurementItemDTO> items, HttpServletRequest request) {
        ProcurementDTO ret = procurService.createProcurement(items, request);
        if(ret != null) {
            return new ResponseEntity<>(ret, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    public ResponseEntity<List<ProcurementDTO>> getAllProcurements() {
        return new ResponseEntity<>(procurService.getAllProcurements(), HttpStatus.OK);
    }

    @RequestMapping(value = "/complete/{id}", method = RequestMethod.PUT)
    public ResponseEntity<ProcurementDTO> getAllProcurements(@PathVariable Long id, HttpServletRequest request) {
        ProcurementDTO ret = procurService.completeProcurement(id, request);
        if(ret != null) {
            return new ResponseEntity<>(ret, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "/user", method = RequestMethod.GET)
    public ResponseEntity<List<ProcurementDTO>> getUserProcurements(HttpServletRequest request) {
        return new ResponseEntity<>(procurService.getUserProcurements(request), HttpStatus.OK);
    }

}
