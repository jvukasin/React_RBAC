package com.master.backend.controller;

import com.master.backend.dto.InventoryDTO;
import com.master.backend.dto.StatsDTO;
import com.master.backend.service.AppService;
import com.master.backend.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/system")
public class AppController {

    @Autowired
    AppService appService;

    @RequestMapping(value = "/stats", method = RequestMethod.GET)
    public ResponseEntity<StatsDTO> getStats() {
        return new ResponseEntity<>(appService.getStats(), HttpStatus.OK);
    }
}
