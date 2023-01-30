package com.cojeans.osiopso.repository.article;

import com.cojeans.osiopso.dto.feed.ArticleDto;
import com.cojeans.osiopso.entity.feed.Article;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ArticleRepository extends JpaRepository<Article, Long> {

}
