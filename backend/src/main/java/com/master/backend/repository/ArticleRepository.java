package com.master.backend.repository;

import com.master.backend.model.Artical;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Artical, Long> {
}
