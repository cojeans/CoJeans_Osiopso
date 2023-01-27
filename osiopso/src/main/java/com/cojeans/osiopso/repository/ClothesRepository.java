package com.cojeans.osiopso.repository;

import com.cojeans.osiopso.entity.closet.Clothes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClothesRepository extends JpaRepository<Clothes, Long> {
}
