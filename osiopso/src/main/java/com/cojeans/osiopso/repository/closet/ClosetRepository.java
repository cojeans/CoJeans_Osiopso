package com.cojeans.osiopso.repository.closet;

import com.cojeans.osiopso.entity.closet.Closet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClosetRepository extends JpaRepository<Closet, Long> {
    // 옷장 리스트 전체 조회
    List<Closet> findAllByUserId(Long uid);

    // 옷장 삭제
    void deleteById(Long id);

    Closet findByName(String name);
}
