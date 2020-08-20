package com.master.backend.repository;

import com.master.backend.model.Article;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article, Long> {

    Article findOneByName(String name);
}
