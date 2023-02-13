package com.cojeans.osiopso.repository.article;

import com.cojeans.osiopso.dto.response.feed.AdviceListResponseDto;
import com.cojeans.osiopso.entity.feed.Advice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AdviceRepository extends JpaRepository<Advice, Long> {

    List<Advice> findAllByDtype(String type);
    List<Advice> findAllBySubjectContaining(String subject);
    List<Advice> findAllByContentContaining(String content);

    List<Advice> findAllByUserId(Long userId);
}