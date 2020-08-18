package com.master.backend.controller;

import com.master.backend.dto.ArticleDTO;
import com.master.backend.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/articles")
public class ArticleController {

    @Autowired
    ArticleService articleService;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<ArticleDTO> getAllArticles() {
        return articleService.findAll();
    }
}
