package com.cojeans.osiopso.repository.article;

import com.cojeans.osiopso.entity.feed.Article;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article, Long> {

}
