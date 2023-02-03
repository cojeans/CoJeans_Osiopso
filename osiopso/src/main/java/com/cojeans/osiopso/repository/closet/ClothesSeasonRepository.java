package com.cojeans.osiopso.repository.closet;

import com.cojeans.osiopso.entity.closet.ClothesSeason;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClothesSeasonRepository extends JpaRepository<ClothesSeason, Long> {
    public List<ClothesSeason> findAllByClothesId(Long id);

    void deleteByClothesIdAndSeasonId(Long clothesId, Long seasonId);
}
