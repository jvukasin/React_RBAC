package com.master.backend.controller;

import com.master.backend.dto.InventoryDTO;
import com.master.backend.dto.RPagesDTO;
import com.master.backend.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/inventory")
public class InventoryController {

    @Autowired
    InventoryService inventService;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public ResponseEntity<List<InventoryDTO>> getInventory() {
        return new ResponseEntity<>(inventService.getInventory(), HttpStatus.OK);
    }

}
