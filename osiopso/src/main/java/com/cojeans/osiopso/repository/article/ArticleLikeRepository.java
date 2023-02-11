package com.cojeans.osiopso.repository.article;

import com.cojeans.osiopso.entity.feed.ArticleLike;
import com.cojeans.osiopso.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ArticleLikeRepository extends JpaRepository<ArticleLike, Long> {
    ArticleLike findByUser_IdAndArticle_Id(Long userId, Long articleNo);
    void deleteByUser_IdAndArticle_Id(Long userId, Long articleNo);
    List<ArticleLike> findAllByArticle_Id(Long articleNo);
    void deleteAllByArticle_Id(Long articleNo);
}
