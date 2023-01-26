package com.cojeans.osiopso.repository;

import com.cojeans.osiopso.entity.feed.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ArticleRepository extends JpaRepository<Article, Long> {

    // 피드 이미지 로드
    @Query("select a from Article a join ArticlePhoto ap on a.id = ap.article.id " +
            "where a.dtype = 'O'")
    List<Article> findFeeds();
}
