package com.cojeans.osiopso.repository.article;

import com.cojeans.osiopso.entity.feed.Advice;
import com.cojeans.osiopso.entity.feed.Ootd;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ArticleScrollQdslRepository {

    List<Advice> findNoOffsetAdvicePaging(Pageable pageable, long idx);
    List<Ootd> findNoOffsetOotdPaging(Pageable pageable, long idx);
}
