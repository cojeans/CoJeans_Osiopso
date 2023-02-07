package com.cojeans.osiopso.repository.comment;

import com.cojeans.osiopso.entity.comment.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    Comment findByIdAndArticle_Id(Long commentNo, Long articleNo);
    void deleteByIdAndArticle_Id(Long commentNo, Long articleNo);
    void deleteByArticle_Id(Long articleNo);
    List<Comment> findAllByArticle_Id(Long id);
}
