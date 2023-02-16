package com.cojeans.osiopso.repository.article;

import com.cojeans.osiopso.entity.feed.Article;
import com.cojeans.osiopso.entity.feed.QArticle;
import com.querydsl.jpa.impl.JPAQueryFactory;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

public class AdviceRepositoryImpl implements  AdviceQdslRepository{
    private final JPAQueryFactory jpaQueryFactory;
    public AdviceRepositoryImpl(JPAQueryFactory jpaQueryFactory) { this.jpaQueryFactory = jpaQueryFactory; }


    @Override
    public List<Article> findByDate(LocalDate now) {
        QArticle article = QArticle.article;

        // 현재 날짜로부터 1개월 전까지
        LocalDate localStart = now.minusMonths(1);
        LocalDate localEnd = now.plusDays(1);
        Date start = Date.valueOf(localStart);
        Date end = Date.valueOf(localEnd);

        return jpaQueryFactory.selectFrom(article)
                .where(article.dtype.eq("A")
                        .and(article.createTime.between(start, end)))
                .fetch();
    }
}
