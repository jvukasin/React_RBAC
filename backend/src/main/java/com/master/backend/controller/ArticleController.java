package com.master.backend.controller;

import com.master.backend.dto.ArticleDTO;
import com.master.backend.dto.ProcurementItemDTO;
import com.master.backend.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
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
    public ResponseEntity<List<ArticleDTO>> getAllArticles() {
        return new ResponseEntity<>(articleService.findAll(), HttpStatus.OK);
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity<ArticleDTO> addArticle(@RequestBody ArticleDTO article) {
        return new ResponseEntity<>(articleService.addArticle(article), HttpStatus.OK);
    }
}
