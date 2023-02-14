package com.cojeans.osiopso.repository.comment;

import com.cojeans.osiopso.entity.comment.CommentClothes;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentClothesRepository extends JpaRepository<CommentClothes, Long> {
    List<CommentClothes> findAllByCommentId(Long commentNo);

    void deleteAllByCommentId(Long id);

    void deleteAllByClothesId(Long id);
}
