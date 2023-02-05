package com.cojeans.osiopso.repository.article;

import com.cojeans.osiopso.entity.feed.CommentLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentLikeRepository extends JpaRepository<CommentLike, Long> {
}
