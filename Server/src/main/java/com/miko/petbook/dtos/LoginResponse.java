package com.miko.petbook.dtos;

import java.time.Instant;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {
  
  private String authenticationToken;
  private String username;
  private String refreshToken;
  private Instant expirationTime;
}