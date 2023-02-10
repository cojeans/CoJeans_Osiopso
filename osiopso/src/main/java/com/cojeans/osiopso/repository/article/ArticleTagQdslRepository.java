package com.cojeans.osiopso.repository.article;

import java.time.LocalDate;
import java.util.List;

public interface ArticleTagQdslRepository {
    public List<Long> findByArticleId(LocalDate now);
}
