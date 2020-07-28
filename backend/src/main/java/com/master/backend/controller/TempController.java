package com.master.backend.controller;

import com.master.backend.dto.TempDTO;
import com.master.backend.service.TempService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/temp")
public class TempController {

    @Autowired
    TempService tempService;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<TempDTO> getAllTemp() {
        return tempService.findAll();
    }
}
