package com.cojeans.osiopso.repository.comment;

import com.cojeans.osiopso.entity.comment.Cocomment;

import java.util.List;

public interface CocommentQdslRepository {
    List<Cocomment> findByRootId(Long rootId, Long start, Long end);
}
