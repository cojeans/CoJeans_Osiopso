package com.cojeans.osiopso.repository.comment;
import com.cojeans.osiopso.entity.comment.Cocomment;
import com.cojeans.osiopso.entity.comment.QCocomment;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public class CocommentRepositoryImpl implements CocommentQdslRepository{
    private final JPAQueryFactory jpaQueryFactory;

    public CocommentRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    @Override
    public List<Cocomment> findByRootId(Long rootId, Long start, Long end) {
        QCocomment cocomment = QCocomment.cocomment;

        // 댓글들 중, pk가 start 부터 end 까지인 row 들을 찾아와야 한다.
        // rootId가 일치하는 것들로만
        return jpaQueryFactory.selectFrom(cocomment)
                .where(cocomment.id.between(start, end), cocomment.rootId.eq(rootId))
                .fetch();
    }
}
