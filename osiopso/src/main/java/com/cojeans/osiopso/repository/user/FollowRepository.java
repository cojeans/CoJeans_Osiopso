package com.cojeans.osiopso.repository.user;

import com.cojeans.osiopso.entity.user.Follow;
import com.cojeans.osiopso.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {
    void deleteByFollowingIdAndFollowerId(Long followingId, Long followerId);

    List<Follow> findAllByFollowingId(Long id);

    List<Follow> findAllByFollowerId(Long id);
}
