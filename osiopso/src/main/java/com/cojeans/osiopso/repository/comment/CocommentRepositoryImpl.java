//package com.cojeans.osiopso.repository.comment;
//
//import com.cojeans.osiopso.entity.comment.Cocomment;
//import com.querydsl.jpa.impl.JPAQueryFactory;
//
//import java.util.List;
//
//public class CocommentRepositoryImpl implements CocommentQdslRepository{
//    private final JPAQueryFactory jpaQueryFactory;
//
//    public CocommentRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
//        this.jpaQueryFactory = jpaQueryFactory;
//    }
//
//    @Override
//    public List<Cocomment> findByRootId(Long rootId, Long start, Long end) {
//        return jpaQueryFactory.selectFrom(QCocomment)
//    }
//
//
//}
