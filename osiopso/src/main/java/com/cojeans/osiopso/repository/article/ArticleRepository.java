package com.cojeans.osiopso.repository.article;

import com.cojeans.osiopso.entity.feed.Advice;
import com.cojeans.osiopso.entity.feed.Article;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ArticleRepository extends JpaRepository<Article, Long> {
//    List<Advice> findAllByDtype(String type);

}
