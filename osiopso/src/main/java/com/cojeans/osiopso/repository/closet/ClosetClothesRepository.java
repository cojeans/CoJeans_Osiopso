package com.cojeans.osiopso.repository.closet;


import com.cojeans.osiopso.entity.closet.ClosetClothes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClosetClothesRepository extends JpaRepository<ClosetClothes, Long> {
    public List<ClosetClothes> findAllByClosetIdOrderByIdDesc(Long id);

    void deleteAllByClothesId(Long id);

    List<ClosetClothes> findAllByClothesId(Long id);

    List<ClosetClothes> findAllByClosetId(Long id);

    void deleteByClothesIdAndClosetId(Long clothesId, Long closetId);

    void deleteAllByClosetId(Long id);

    Long countByClosetId(Long id);
}
