package com.cojeans.osiopso.repository.comment;

import com.cojeans.osiopso.entity.comment.CommentLike;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface CommentLikeRepository extends JpaRepository<CommentLike, Long> {
    List<CommentLike> findAllByComment_Id(Long articleNo);
    CommentLike findByUser_IdAndComment_IdAndArticle_Id(Long userId, Long commentNo, Long id);
    CommentLike findByComment_Id(Long commentId);
    void deleteByUser_IdAndComment_IdAndArticle_Id(Long userId, Long commentNo, Long id);
    void deleteByComment_IdAndArticle_Id(Long commentNo, Long articleNo);
}
