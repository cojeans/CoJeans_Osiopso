package com.cojeans.osiopso.repository.comment;

import com.cojeans.osiopso.entity.comment.Cocomment;

import java.time.LocalDate;
import java.util.List;

public interface CocommentQdslRepository {
    List<Cocomment> findByRootId(Long rootId, Long start, Long end);
}
