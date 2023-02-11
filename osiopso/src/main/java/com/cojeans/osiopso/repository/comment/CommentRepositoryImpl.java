package com.cojeans.osiopso.repository.comment;

import com.cojeans.osiopso.entity.comment.QComment;
import com.cojeans.osiopso.entity.feed.Article;
import com.cojeans.osiopso.entity.feed.QArticle;
import com.querydsl.jpa.impl.JPAQueryFactory;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

public class CommentRepositoryImpl implements  CommentQdslRepository {
    private final JPAQueryFactory jpaQueryFactory;

    public CommentRepositoryImpl(JPAQueryFactory jpaQueryFactory) { this.jpaQueryFactory = jpaQueryFactory; }

    @Override
    public List<Long> findByArticleId(LocalDate now) {
        QComment comment = QComment.comment;
        QArticle article = QArticle.article;
        
        // 현재 날짜로부터 1개월 전까지
        LocalDate localStart = now.minusMonths(1);
        LocalDate localEnd = now.plusDays(1);
        Date start = Date.valueOf(localStart);
        Date end = Date.valueOf(localEnd);

        System.out.println(start + " | " + end);
        // select article_id, count(*) as count from comment
        // where article_id
        // in (select id from article where create_time >= date_sub(now(), interval 1 month) and create_time <= now())
        // group by article_id
        // order by count desc;

        // select article_id from comment
        // inner join article
        // on article_id = article.id
        // group by article_id
        // order by count(*) desc;
        return jpaQueryFactory.select(article.id)
                .from(comment)
                .innerJoin(comment.article, article)
                .where(article.createTime.between(start, end))
                .groupBy(article.id)
                .orderBy(article.id.count().desc())
                .limit(5)
                .fetch();
    }
}
