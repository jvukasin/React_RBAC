package com.master.backend.service;

import com.master.backend.dto.ArticleDTO;
import com.master.backend.model.Artical;
import com.master.backend.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ArticleService {

    @Autowired
    ArticleRepository articleRepository;

    public List<ArticleDTO> findAll() {
        List<Artical> articals = articleRepository.findAll();
        List<ArticleDTO> ret = new ArrayList<>();
        for (Artical a : articals) {
            ArticleDTO dto = new ArticleDTO(a);
            ret.add(dto);
        }
        return ret;
    }
}
