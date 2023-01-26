package com.cojeans.osiopso.api.repository;

import com.cojeans.osiopso.api.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    UserDetails findByUsername(String username);
    Optional<User> findByKakaoId(Long kakaoId);
}