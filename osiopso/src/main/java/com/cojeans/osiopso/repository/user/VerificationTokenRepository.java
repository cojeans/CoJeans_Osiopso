package com.cojeans.osiopso.repository.user;

import com.cojeans.osiopso.entity.user.VerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Long> {
    List<VerificationToken> findAllByUserEmail(String userEmail);

    Optional<VerificationToken> findOneByToken(String token);
}
