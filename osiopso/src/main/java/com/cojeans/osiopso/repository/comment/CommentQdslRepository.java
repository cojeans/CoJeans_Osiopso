package com.cojeans.osiopso.repository.comment;

import com.cojeans.osiopso.entity.feed.Article;

import java.time.LocalDate;
import java.util.List;

public interface CommentQdslRepository {
    public List<Long> findByArticleId(LocalDate now);
}
