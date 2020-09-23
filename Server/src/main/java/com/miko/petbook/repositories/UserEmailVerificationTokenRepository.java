package com.miko.petbook.repositories;

import java.util.Optional;

import com.miko.petbook.models.UserEmailVerificationToken;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserEmailVerificationTokenRepository extends JpaRepository<UserEmailVerificationToken, Long> {
  
  Optional<UserEmailVerificationToken> findByToken(String token);
}