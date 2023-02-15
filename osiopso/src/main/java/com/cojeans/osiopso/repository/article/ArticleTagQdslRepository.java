package com.cojeans.osiopso.repository.article;

import com.cojeans.osiopso.entity.feed.Ootd;
import com.cojeans.osiopso.entity.user.Gender;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;

public interface ArticleTagQdslRepository {
    public List<Long> findByArticleId(LocalDate now);

    List<Long> findArticleByTags(List<String> styleTag, List<String> tpoTag, Pageable pageable, Long idx);
    List<Ootd> findArticleByAge(Long age, Pageable pageable, Long idx);
    List<Ootd> findArticleByGender(Gender gender, Pageable pageable, Long idx);
    List<Ootd> findArticleByAgeAndGender(Long age, Gender gender, Pageable pageable, Long idx);
}
