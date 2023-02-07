package com.cojeans.osiopso.repository.comment;

import com.cojeans.osiopso.dto.response.comment.CocommentResponseDto;
import com.cojeans.osiopso.entity.comment.Cocomment;
import com.cojeans.osiopso.entity.comment.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CocommentRepository extends JpaRepository<Cocomment, Long> {
    Cocomment findByComment_Id(Long commentNo);

    void deleteAllByRootId(Long commentno);

    List<Cocomment> findAllByComment_Id(Long id);
}
