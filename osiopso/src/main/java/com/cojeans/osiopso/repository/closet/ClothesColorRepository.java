package com.cojeans.osiopso.repository.closet;

import com.cojeans.osiopso.entity.closet.ClothesColor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClothesColorRepository  extends JpaRepository<ClothesColor, Long> {
    public List<ClothesColor> findAllByClothesId(Long id);

    void deleteByClothesIdAndColorId(Long clothesId, Long colorId);

    void deleteAllByClothesId(Long id);

    ClothesColor findByClothesIdAndColorId(Long id, Long id1);
}
