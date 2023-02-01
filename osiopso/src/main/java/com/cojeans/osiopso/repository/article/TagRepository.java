package com.cojeans.osiopso.repository.article;

import com.cojeans.osiopso.entity.tag.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag, Long> {
}
