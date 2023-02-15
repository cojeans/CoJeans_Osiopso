package com.cojeans.osiopso.repository.article;

import com.cojeans.osiopso.entity.comment.QComment;
import com.cojeans.osiopso.entity.feed.*;
import com.cojeans.osiopso.entity.tag.QTag;
import com.cojeans.osiopso.entity.user.Gender;
import com.cojeans.osiopso.entity.user.QUser;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.StringPath;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.eclipse.jdt.internal.compiler.ast.Expression;
import org.springframework.data.domain.Pageable;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class ArticleTagRepositoryImpl implements ArticleTagQdslRepository {
    private final JPAQueryFactory jpaQueryFactory;
    public ArticleTagRepositoryImpl(JPAQueryFactory jpaQueryFactory) { this.jpaQueryFactory = jpaQueryFactory; }

    @Override
    public List<Long> findByArticleId(LocalDate now){
        QArticle article = QArticle.article;
        QArticleTag articleTag = QArticleTag.articleTag;

        // 현재 날짜로부터 1개월 전까지
        LocalDate localStart = now.minusMonths(1);
        LocalDate localEnd = now.plusDays(1);
        Date start = Date.valueOf(localStart);
        Date end = Date.valueOf(localEnd);

        System.out.println(start + " : " + end);

        // select article_id, count(*)
        // from article_tag
        // where article_id
        // in (select id from article where create_time >= date_sub(now(), interval 1 month) and create_time <= now())
        // group by article_id
        // order by count(*) desc
        // limit 5;

        // select article_id, count(*)
        // from article_tag
        // inner join article
        // on article_id = article.id
        // group by article_id
        // order by count(*) desc
        // limit 5;

        // select tag_id, count(*)
        // from article_tag
        // where article_tag.create_time between '2023-01-10' and '2023-02-11'
        // group by tag_id
        // order by count(*) desc
        // limit 5;

        return jpaQueryFactory.select(articleTag.tag.id)
                .from(articleTag)
                .where(articleTag.createTime.between(start, end))
                .groupBy(articleTag.tag)
                .orderBy(articleTag.tag.count().desc())
                .limit(5)
                .fetch();
    }

    @Override
    public List<Long> findArticleByTags(List<String> styleTag, List<String> tpoTag, Pageable pageable, Long idx) {
        QArticleTag articleTag = QArticleTag.articleTag;
        QTag tag = QTag.tag;

        List<String> tags = new ArrayList<>();

        for (String s : styleTag) {
            tags.add(s);
        }

        for (String s : tpoTag) {
            tags.add(s);
        }

        // tags 필터링할 태그


        return jpaQueryFactory.select(articleTag.article.id)
                .from(articleTag)
                .leftJoin(tag)
                .on(tag.id.eq(articleTag.tag.id))
                .where(tag.keyword.in(tags).and(articleTag.article.id.lt(idx)))
                .orderBy(articleTag.article.id.desc())
                .limit(pageable.getPageSize())
                .fetch();
    }

    @Override
    public List<Ootd> findArticleByAge(Long age, Pageable pageable, Long idx) {
        QOotd ootd = QOotd.ootd;
        QUser user = QUser.user;
//        select *
//        from article a
//        left join user u
//        on a.id = u.id
//        where u.age = 0
//        ;
        age /= 10;

        return jpaQueryFactory.selectFrom(ootd)
                .leftJoin(user)
                .on(ootd.user.id.eq(user.id))
                .where(user.age.divide(10).eq(Math.toIntExact(age)).and(ootd.id.lt(idx)))
                .orderBy(ootd.id.desc())
                .limit(pageable.getPageSize())
                .fetch();
    }

    @Override
    public List<Ootd> findArticleByGender(Gender gender, Pageable pageable, Long idx) {
        QOotd ootd = QOotd.ootd;
        QUser user = QUser.user;

        return jpaQueryFactory.selectFrom(ootd)
                .leftJoin(user)
                .on(ootd.user.id.eq(user.id))
                .where(user.gender.eq(gender).and(ootd.id.lt(idx)))
                .orderBy(ootd.id.desc())
                .limit(pageable.getPageSize())
                .fetch();
    }

    @Override
    public List<Ootd> findArticleByAgeAndGender(Long age, Gender gender, Pageable pageable, Long idx) {
        QOotd ootd = QOotd.ootd;
        QUser user = QUser.user;
//        select *
//        from article a
//        left join user u
//        on a.id = u.id
//        where u.age = 0
//        ;
        age /= 10;

        return jpaQueryFactory.selectFrom(ootd)
                .leftJoin(user)
                .on(ootd.user.id.eq(user.id))
                .where(user.age.divide(10).eq(Math.toIntExact(age)).and(user.gender.eq(gender)).and(ootd.id.lt(idx)))
                .orderBy(ootd.id.desc())
                .limit(pageable.getPageSize())
                .fetch();
    }

    @Override
    public List<Ootd> findArticleByPop(Pageable pageable, Long idx) {
        QOotd ootd = QOotd.ootd;
        QArticleLike articleLike = QArticleLike.articleLike;

        StringPath aliasQuantity = Expressions.stringPath("score");
        List<Ootd> ootdList = new ArrayList<>();


        List<Tuple> ootdTuple = jpaQueryFactory.select(ootd, (articleLike.article.id.count()).as("score"))
                .from(ootd)
                .leftJoin(articleLike)
                .on(ootd.id.eq(articleLike.article.id))
                .where(ootd.id.lt(idx))
                .groupBy(ootd.id)
                .orderBy(aliasQuantity.desc(), ootd.id.desc())
                .limit(pageable.getPageSize())
                .fetch();


        for (Tuple tuple : ootdTuple) {
            ootdList.add(Ootd.builder()
                    .id(tuple.get(ootd).getId())
                    .user(tuple.get(ootd).getUser())
                    .content(tuple.get(ootd).getContent())
                    .createTime(tuple.get(ootd).getCreateTime())
                    .hit(tuple.get(ootd).getHit())
                    .build());
        }

        return ootdList;
    }

}
