package com.miko.petbook.services;

import java.time.Instant;
import java.util.UUID;

import com.miko.petbook.exceptions.InvalidTokenException;
import com.miko.petbook.models.RefreshToken;
import com.miko.petbook.repositories.RefreshTokenRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
@Transactional
public class RefreshTokenService {

  private final RefreshTokenRepository refreshTokenRepo;

  public RefreshToken generateRefreshToken() {
    RefreshToken token = new RefreshToken(0L, UUID.randomUUID().toString(), Instant.now());
    return refreshTokenRepo.save(token);
  }

  public void deleteRefreshToken(String token) {
    refreshTokenRepo.deleteByToken(token);
  }

  public void validateRefreshToken(String token) throws InvalidTokenException {
    refreshTokenRepo.findByToken(token).orElseThrow(() -> new InvalidTokenException("Error: Invalid refresh token"));
  }
}