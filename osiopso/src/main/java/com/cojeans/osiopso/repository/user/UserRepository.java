package com.cojeans.osiopso.repository.user;

import com.cojeans.osiopso.entity.user.AuthProvider;
import com.cojeans.osiopso.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmailAndProvider(String email, AuthProvider authProvider);

    Boolean existsByEmail(String email);

    List<User> findAllByNameStartingWith(String input);

}
