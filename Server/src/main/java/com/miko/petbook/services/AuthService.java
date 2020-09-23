package com.miko.petbook.services;

import java.time.Instant;
import java.util.UUID;

import com.miko.petbook.dtos.LoginResponse;
import com.miko.petbook.dtos.RefreshTokenRequest;
import com.miko.petbook.dtos.LoginRequest;
import com.miko.petbook.dtos.SignupRequest;
import com.miko.petbook.exceptions.InvalidTokenException;
import com.miko.petbook.exceptions.UserAlreadyExistsException;
import com.miko.petbook.exceptions.UserNotFoundException;
import com.miko.petbook.models.EmailNotification;
import com.miko.petbook.models.User;
import com.miko.petbook.models.UserEmailVerificationToken;
import com.miko.petbook.repositories.UserEmailVerificationTokenRepository;
import com.miko.petbook.repositories.UserRepository;
import com.miko.petbook.security.JwtProvider;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class AuthService {
  
  private final UserRepository userRepo;
  private final UserEmailVerificationTokenRepository verificationTokenRepo;
  private final PasswordEncoder encoder;
  private final MailService mailService;
  private final AuthenticationManager authManager;
  private final JwtProvider provider;
  private final RefreshTokenService refreshTokenService;

  private static final String VERIFICATION_EMAIL_SUBJECT = "Petbook Account Verification";
  private static final String VERIFICATION_EMAIL_CONTENT = "Please activate your account by clicking the provided url: ";
  private static final String VERIFICATION_EMAIL_URL = "http://localhost:8080/api/auth/accountverification/";

  public void signup(SignupRequest request) throws UserAlreadyExistsException {
    if (userRepo.existsByEmail(request.getEmail()))
      throw new UserAlreadyExistsException("Please use another email address");

    if (userRepo.existsByUsername(request.getUsername()))
      throw new UserAlreadyExistsException("Username is already taken");
    
    User user = User.builder()
                    .username(request.getUsername())
                    .email(request.getEmail())
                    .password(encoder.encode(request.getPassword()))
                    .firstName(request.getFirstName())
                    .lastName(request.getLastName())
                    .dateOfBirth(request.getDateOfBirth())
                    .isEnabled(false)
                    .timeCreated(Instant.now()).build();

    User savedUser = userRepo.save(user);
  
    String verificationToken = generateToken(savedUser);
    EmailNotification notification = new EmailNotification(VERIFICATION_EMAIL_SUBJECT, 
      user.getEmail(), 
      VERIFICATION_EMAIL_CONTENT + VERIFICATION_EMAIL_URL + verificationToken
    );
    mailService.sendEmail(notification);
  }

  private String generateToken(User user) {
    String token = UUID.randomUUID().toString();
    UserEmailVerificationToken userEmailVerificationToken = new UserEmailVerificationToken(0L, token, user, null);
    verificationTokenRepo.save(userEmailVerificationToken);
    return token;
  }

  public void verifyAccount(String token) throws InvalidTokenException, UserNotFoundException {
    UserEmailVerificationToken verificationToken = verificationTokenRepo.findByToken(token)
                                                      .orElseThrow(() -> new InvalidTokenException("Invalid verification token"));
    User user = userRepo.findByUsername(verificationToken.getUser()
                                            .getUsername())
                                            .orElseThrow(() -> new UserNotFoundException("Invalid user"));
    user.setEnabled(true);
    userRepo.save(user);
  }

  public LoginResponse login(LoginRequest request) throws InvalidTokenException {
    UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword());
    Authentication authentication = authManager.authenticate(token);
    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwtToken = provider.generateJwtToken(authentication);
    String newRefreshToken = refreshTokenService.generateRefreshToken().getToken();
    return LoginResponse.builder()
                        .authenticationToken(jwtToken)
                        .username(request.getUsername())
                        .refreshToken(newRefreshToken)
                        .expirationTime(Instant.now().plusMillis(provider.getExpirationTime()))
                        .build();
  }

  @Transactional(readOnly = true)
  public User getCurrentUser() {
    org.springframework.security.core.userdetails.User user = (org.springframework.security.core.userdetails.User) SecurityContextHolder.
            getContext().getAuthentication().getPrincipal();
    return userRepo.findByUsername(user.getUsername())
            .orElseThrow(() -> new UsernameNotFoundException(String.format("Username %s not found", user.getUsername())));
  }

  public  LoginResponse refreshToken(RefreshTokenRequest request) throws InvalidTokenException {
    refreshTokenService.validateRefreshToken(request.getToken());
    String jwt = provider.generateJwtTokenIncludingUsername(request.getUsername());
    return LoginResponse.builder()
                        .authenticationToken(jwt)
                        .username(request.getUsername())
                        .refreshToken(request.getToken())
                        .expirationTime(Instant.now().plusMillis(provider.getExpirationTime()))
                        .build();
  }
}