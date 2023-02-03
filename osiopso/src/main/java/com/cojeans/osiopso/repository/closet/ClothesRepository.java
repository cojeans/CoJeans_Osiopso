package com.cojeans.osiopso.repository.closet;

import com.cojeans.osiopso.entity.closet.Clothes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClothesRepository extends JpaRepository<Clothes, Long> {
    Optional<Clothes> findById(Long id);
}
