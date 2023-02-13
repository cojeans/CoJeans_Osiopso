package com.cojeans.osiopso.repository.comment;

import com.cojeans.osiopso.entity.comment.CommentPhoto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentPhotoRepository extends JpaRepository<CommentPhoto, Long> {
    CommentPhoto findByArticle_IdAndComment_Id(Long id, Long id1);
}
