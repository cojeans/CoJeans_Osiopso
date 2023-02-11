package com.cojeans.osiopso.repository.article;

import com.cojeans.osiopso.entity.feed.Article;
import com.cojeans.osiopso.entity.feed.QArticle;
import com.querydsl.jpa.impl.JPAQueryFactory;

import java.util.List;

public class OotdRepositoryImpl implements OotdQdslRepository{
    private final JPAQueryFactory jpaQueryFactory;
    public OotdRepositoryImpl(JPAQueryFactory jpaRepository) { this.jpaQueryFactory = jpaRepository; }

    @Override
    public List<Article> findByUserId(Long followerId) {
        QArticle article = QArticle.article;
        QFollow follow = QFollow.follow;

        // select article.* from article
        // inner join follow
        // on article.user_id = follow.following_id
        // where follower_id = 2
        // order by article.id desc;
        return jpaQueryFactory.select(article)
                .from(article)
                .innerJoin(follow)
                .on(article.user.eq(follow.following))
                .where (follow.follower.id.eq(followerId).and(article.dtype.eq("O")))
                .orderBy(article.id.desc())
                .fetch();
    }
}
