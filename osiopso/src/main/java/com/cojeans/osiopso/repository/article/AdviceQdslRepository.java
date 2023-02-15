package com.cojeans.osiopso.repository.article;

import com.cojeans.osiopso.entity.feed.Article;

import java.time.LocalDate;
import java.util.List;

public interface AdviceQdslRepository {
    List<Article> findByDate(LocalDate now);
}
