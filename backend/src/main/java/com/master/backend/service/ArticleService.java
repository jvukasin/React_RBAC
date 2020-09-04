package com.master.backend.service;

import com.master.backend.dto.ArticleDTO;
import com.master.backend.model.Article;
import com.master.backend.model.Inventory;
import com.master.backend.repository.ArticleRepository;
import com.master.backend.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ArticleService {

    @Autowired
    ArticleRepository articleRepository;

    @Autowired
    InventoryRepository inventoryRepository;

    public List<ArticleDTO> findAll() {
        List<Article> articles = articleRepository.findAll();
        List<ArticleDTO> ret = new ArrayList<>();
        for (Article a : articles) {
            ArticleDTO dto = new ArticleDTO(a);
            ret.add(dto);
        }
        return ret;
    }

    public ArticleDTO addArticle(ArticleDTO article) {
        Article newArticle = new Article();
        newArticle.setName(article.getName());
        newArticle.setBrand(article.getBrand());
        newArticle.setCode(article.getCode());
        newArticle.setPrice(article.getPrice());
        newArticle = articleRepository.save(newArticle);
        Inventory inv = new Inventory();
        inv.setQuantity(0);
        inv.setArticle(newArticle);
        inventoryRepository.save(inv);
        article.setId(newArticle.getId());
        return article;
    }
}
