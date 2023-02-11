package com.cojeans.osiopso.repository.article;

import com.cojeans.osiopso.entity.feed.Article;

import java.util.List;

public interface OotdQdslRepository {
    List<Article> findByUserId(Long followerId);
}
