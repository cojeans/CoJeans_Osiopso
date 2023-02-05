package com.cojeans.osiopso.repository.article;

import com.cojeans.osiopso.entity.feed.ArticleLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleLikeRepository extends JpaRepository<ArticleLike, Long> {
}
