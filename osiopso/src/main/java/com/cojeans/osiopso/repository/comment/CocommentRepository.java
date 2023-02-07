package com.cojeans.osiopso.repository.comment;

import com.cojeans.osiopso.entity.comment.Cocomment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CocommentRepository extends JpaRepository<Cocomment, Long> {
    Cocomment findByComment_Id(Long commentNo);
    List<Cocomment> findAllByComment_Id(Long id);


    void deleteAllByRootId(Long commentno);
    List<Cocomment> findTop3ByRootId(Long rootId);
}
