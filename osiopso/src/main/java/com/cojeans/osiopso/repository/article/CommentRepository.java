package com.cojeans.osiopso.repository.article;

import com.cojeans.osiopso.entity.comment.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    Comment findByIdAndArticle_Id(Long commentNo, Long articleNo);
    void deleteByIdAndArticle_Id(Long commentNo, Long articleNo);
    void deleteByArticle_Id(Long articleNo);
    List<Comment> findAllByArticle_Id(Long id);
    void deleteAllByRootId(Long commentno);
}
