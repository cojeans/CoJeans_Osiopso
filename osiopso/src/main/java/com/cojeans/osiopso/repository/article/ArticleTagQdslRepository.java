package com.cojeans.osiopso.repository.article;

import com.cojeans.osiopso.entity.feed.Ootd;
import com.cojeans.osiopso.entity.user.Gender;

import java.time.LocalDate;
import java.util.List;

public interface ArticleTagQdslRepository {
    public List<Long> findByArticleId(LocalDate now);

    List<Long> findArticleByTags(List<String> styleTag, List<String> tpoTag);
    List<Ootd> findArticleByAge(Long age);
    List<Ootd> findArticleByGender(Gender gender);
    List<Ootd> findArticleByAgeAndGender(Long age, Gender gender);
}
