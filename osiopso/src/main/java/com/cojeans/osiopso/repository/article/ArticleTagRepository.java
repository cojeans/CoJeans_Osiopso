package com.cojeans.osiopso.repository.article;

import com.cojeans.osiopso.entity.feed.ArticleTag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ArticleTagRepository extends JpaRepository<ArticleTag, Long> {
    List<ArticleTag> findByArticle_Id(Long articleNo);

    List<ArticleTag> findAllByTag_Id(Long tagId);
}
