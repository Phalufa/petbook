package com.miko.petbook.repositories;

import java.util.Optional;

import com.miko.petbook.models.RefreshToken;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

  Optional<RefreshToken> findByToken(String token);

  boolean existsByToken(String token);

  void deleteByToken(String token);
}