package com.cojeans.osiopso.repository.closet;


import com.cojeans.osiopso.dto.closet.ClosetDto;
import com.cojeans.osiopso.dto.closet.ClothesDto;
import com.cojeans.osiopso.entity.closet.ClosetClothes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClosetClothesRepository extends JpaRepository<ClosetClothes, Long> {
    public List<ClosetClothes> findAllByClosetIdOrderByIdDesc(Long id);
}
