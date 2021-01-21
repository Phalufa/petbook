package com.miko.petbook.security;

import java.io.IOException;
import java.io.InputStream;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.UnrecoverableKeyException;
import java.security.cert.CertificateException;
import java.time.Instant;
import java.util.Date;

import javax.annotation.PostConstruct;

import com.miko.petbook.exceptions.InvalidTokenException;

import org.springframework.security.core.userdetails.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;

import static io.jsonwebtoken.Jwts.parser;

@Service
public class JwtProvider {

  @Value("${petbook.app.jwt.password}")
  private String jwtPassword;
  @Value("${petbook.app.jwt.expiration}")
  private Long jwtExpirationTime;
  private KeyStore keyStore;

  @PostConstruct
  public void init() {
    try {
      keyStore = KeyStore.getInstance("JKS");
      InputStream resourceAsStream = getClass().getResourceAsStream("/petbook.jks");
      keyStore.load(resourceAsStream, jwtPassword.toCharArray());
    } catch (KeyStoreException | CertificateException | NoSuchAlgorithmException | IOException e) {
      throw new InvalidTokenException("Exception occurred while loading keystore" + e.getMessage());
    }
  }

  public String generateJwtToken(Authentication authentication) {
    User user = (User) authentication.getPrincipal();
    return Jwts.builder().setSubject(user.getUsername()).setIssuedAt(Date.from(Instant.now())).signWith(getPrivateKey())
        .setExpiration(Date.from(Instant.now().plusMillis(jwtExpirationTime))).compact();
  }

  public String generateJwtTokenIncludingUsername(String username) {
    return Jwts.builder().setSubject(username).setIssuedAt(Date.from(Instant.now())).signWith(getPrivateKey())
        .setExpiration(Date.from(Instant.now().plusMillis(jwtExpirationTime))).compact();
  }

  public Long getExpirationTime() {
    return jwtExpirationTime;
  }

  private PrivateKey getPrivateKey() {
    try {
      return (PrivateKey) keyStore.getKey("petbook", jwtPassword.toCharArray());
    } catch (KeyStoreException | NoSuchAlgorithmException | UnrecoverableKeyException e) {
      throw new InvalidTokenException("Exception occured while retrieving public key from keystore");
    }
  }

  public boolean validateToken(String jwt) throws InvalidTokenException {
    parser().setSigningKey(getPublickey()).parseClaimsJws(jwt);
    return true;
  }

  private PublicKey getPublickey() {
    try {
      return keyStore.getCertificate("petbook").getPublicKey();
    } catch (KeyStoreException e) {
      throw new InvalidTokenException("Exception occured while retrieving public key from keystore " + e.getMessage());
    }
  }

  public String getUsernameFromJwt(String token) {
    return parser().setSigningKey(getPublickey()).parseClaimsJws(token).getBody().getSubject();
  }
}