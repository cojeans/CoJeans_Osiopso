package com.cojeans.osiopso.repository.comment;

import com.cojeans.osiopso.entity.comment.Cocomment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CocommentRepository extends JpaRepository<Cocomment, Long> {
    Cocomment findByComment_Id(Long commentNo);
    List<Cocomment> findAllByRootId(Long rootId);

    List<Cocomment> findAllByMentionId(Long id);
    void deleteAllByRootId(Long commentNo);
    void deleteByComment_Id(Long commentNo);
    void deleteAllByArticle_Id(Long commentNo);
}
