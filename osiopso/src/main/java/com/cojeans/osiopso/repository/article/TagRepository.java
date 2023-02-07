package com.cojeans.osiopso.repository.article;

import com.cojeans.osiopso.entity.tag.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TagRepository extends JpaRepository<Tag, Long> {
    List<Tag> findAllByKeywordStartingWith(String input);

    List<Tag> findAllByKeyword(String keyword);
}
