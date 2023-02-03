package com.cojeans.osiopso.repository.closet;

import com.cojeans.osiopso.entity.closet.ClothesTag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClothesTagRepository extends JpaRepository<ClothesTag, Long> {
    public List<ClothesTag> findAllByClothesId(Long id);

    void deleteByClothesIdAndTagId(Long clothesId, Long tagId);
}
