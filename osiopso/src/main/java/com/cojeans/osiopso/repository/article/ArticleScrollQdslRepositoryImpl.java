package com.cojeans.osiopso.repository.article;

import com.cojeans.osiopso.entity.feed.*;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ArticleScrollQdslRepositoryImpl implements ArticleScrollQdslRepository{

    private final JPAQueryFactory jpaQueryFactory;

    public ArticleScrollQdslRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    @Override
    public List<Advice> findNoOffsetAdvicePaging(Pageable pageable, long idx) {
        QAdvice advice = QAdvice.advice;

        return jpaQueryFactory.selectFrom(advice)
                .where(advice.dtype.eq("A")
                .and(advice.id.lt(idx)))
                .orderBy(advice.id.desc())
                .limit(pageable.getPageSize())
                .fetch();
    }

    @Override
    public List<Ootd> findNoOffsetOotdPaging(Pageable pageable, long idx) {
        QOotd ootd = QOotd.ootd;

        return jpaQueryFactory.selectFrom(ootd)
                .where(ootd.dtype.eq("O")
                .and(ootd.id.lt(idx)))
                .orderBy(ootd.id.desc())
                .limit(pageable.getPageSize())
                .fetch();
    }
}
