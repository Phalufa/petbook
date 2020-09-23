package com.miko.petbook.controllers;

import com.miko.petbook.dtos.LoginRequest;
import com.miko.petbook.dtos.RefreshTokenRequest;
import com.miko.petbook.dtos.SignupRequest;
import com.miko.petbook.exceptions.InvalidTokenException;
import com.miko.petbook.exceptions.UserAlreadyExistsException;
import com.miko.petbook.exceptions.UserNotFoundException;
import com.miko.petbook.services.AuthService;
import com.miko.petbook.services.RefreshTokenService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {
  
  private final AuthService authService;
  private final RefreshTokenService refreshTokenService;

  @PostMapping("/signup")
  public ResponseEntity<?> signUp(@RequestBody SignupRequest request) throws UserAlreadyExistsException {
    authService.signup(request);
    return ResponseEntity.ok("Thank you for registering! A confirmation email has been sent to. To continue Please verify your account");
  }

  @GetMapping("/accountverification/{token}")
  public ResponseEntity<?> verifyAccount(@PathVariable String token) throws InvalidTokenException, UserNotFoundException {
    authService.verifyAccount(token);
    return ResponseEntity.ok("Your account is now verified");
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody LoginRequest request) {
    return ResponseEntity.ok(authService.login(request));
  }

  @PostMapping("/refresh-token")
  public ResponseEntity<?> refreshToken(@RequestBody RefreshTokenRequest request) throws InvalidTokenException {
    return ResponseEntity.ok(authService.refreshToken(request));
  }

  @PostMapping("/logout")
  public ResponseEntity<?> logout(@RequestBody RefreshTokenRequest request) {
    refreshTokenService.deleteRefreshToken(request.getToken());
    return ResponseEntity.ok("You have been logged out successfully");
  }
}