package com.cojeans.osiopso.repository.article;

import com.cojeans.osiopso.entity.feed.Article;
import com.cojeans.osiopso.entity.feed.Ootd;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OotdRepository extends JpaRepository<Ootd, Long> {

    // 피드 이미지 로드
//    @Query("select a from Article a join ArticlePhoto ap on a.id = ap.article.id " +
//            "where a.dtype = 'O'")
    @Query("select a from Article a where a.dtype = 'O'")
    List<Ootd> findList();
}
