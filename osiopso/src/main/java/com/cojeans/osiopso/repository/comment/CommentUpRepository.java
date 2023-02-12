package com.cojeans.osiopso.repository.comment;

import com.cojeans.osiopso.entity.comment.CommentUp;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentUpRepository extends JpaRepository<CommentUp, Long> {
    CommentUp findByComment_Id(Long commentNo);

    void deleteByComment_Id(Long commentNo);

    void deleteByArticle_Id(Long articleNo);
}
