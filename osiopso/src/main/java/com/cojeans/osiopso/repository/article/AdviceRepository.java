package com.cojeans.osiopso.repository.article;

import com.cojeans.osiopso.entity.feed.Advice;
import com.cojeans.osiopso.entity.feed.Ootd;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AdviceRepository extends JpaRepository<Advice, Long> {

    @Query("select a from Article a where a.dtype = 'A'")
    List<Advice> findList();

}
