package com.cojeans.osiopso.repository.comment;

import com.cojeans.osiopso.entity.comment.CommentLike;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentLikeRepository extends JpaRepository<CommentLike, Long> {
    CommentLike findByUser_IdAndComment_IdAndArticle_Id(Long userId, Long commentNo, Long id);
    void deleteByUser_IdAndComment_IdAndArticle_Id(Long userId, Long commentNo, Long id);
    List<CommentLike> findAllByArticle_Id(Long articleNo);
}
