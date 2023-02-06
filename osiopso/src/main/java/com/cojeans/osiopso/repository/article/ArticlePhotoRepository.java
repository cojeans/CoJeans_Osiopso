package com.cojeans.osiopso.repository.article;

import com.cojeans.osiopso.entity.feed.ArticlePhoto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ArticlePhotoRepository extends JpaRepository<ArticlePhoto, Long> {
    void deleteByArticle_Id(Long articleId);
    List<ArticlePhoto> findAllByArticle_Id(Long id);
    void deleteAllByArticle_Id(Long userId);
}
