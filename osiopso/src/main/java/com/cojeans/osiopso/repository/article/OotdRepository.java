package com.cojeans.osiopso.repository.article;

import com.cojeans.osiopso.dto.response.feed.OotdListResponseDto;
import com.cojeans.osiopso.entity.feed.Ootd;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OotdRepository extends JpaRepository<Ootd, Long> {
    List<Ootd> findAllByUserId(Long userId);
}
