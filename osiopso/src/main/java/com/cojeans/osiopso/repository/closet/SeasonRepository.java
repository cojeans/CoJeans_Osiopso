package com.cojeans.osiopso.repository.closet;

import com.cojeans.osiopso.entity.closet.Season;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SeasonRepository extends JpaRepository<Season, Long> {

    Season findByName(String name);
}
