package com.cojeans.osiopso.repository.article;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    Comment findByIdAndArticle_Id(Long commentNo, Long articleNo);
    void deleteByIdAndArticle_Id(Long commentNo, Long articleNo);
    void deleteByArticle_Id(Long articleNo);
}
