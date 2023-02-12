package com.cojeans.osiopso.repository.comment;

import com.cojeans.osiopso.entity.comment.CommentDown;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentDownRepository extends JpaRepository<CommentDown, Long> {
    CommentDown findByComment_Id(Long commentNo);

    void deleteByComment_Id(Long commentNo);

    void deleteByArticle_Id(Long articleNo);
}
