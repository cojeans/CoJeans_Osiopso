package com.cojeans.osiopso.repository.article;

import com.cojeans.osiopso.entity.feed.CommentLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentLikeRepository extends JpaRepository<CommentLike, Long> {
    CommentLike findByUser_IdAndComment_IdAndArticle_Id(Long userId, Long commentNo, Long id);
    void deleteByUser_IdAndComment_IdAndArticle_Id(Long userId, Long commentNo, Long id);
}
