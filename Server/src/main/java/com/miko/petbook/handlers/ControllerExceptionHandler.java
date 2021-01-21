package com.miko.petbook.handlers;

import com.miko.petbook.exceptions.CommentNotFoundException;
import com.miko.petbook.exceptions.InvalidTokenException;
import com.miko.petbook.exceptions.NotAllowedException;
import com.miko.petbook.exceptions.PostNotFoundException;
import com.miko.petbook.exceptions.UserAlreadyExistsException;
import com.miko.petbook.exceptions.UserNotFoundException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ControllerExceptionHandler {

  @ExceptionHandler({ CommentNotFoundException.class, PostNotFoundException.class, UserNotFoundException.class })
  private ResponseEntity<?> notFoundHandler(Exception e) {
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
  }

  @ExceptionHandler(NotAllowedException.class)
  private ResponseEntity<?> notAllowedHandler(Exception e) {
    return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).body(e.getMessage());
  }

  @ExceptionHandler(UserAlreadyExistsException.class)
  private ResponseEntity<?> entityAlreadyExists(Exception e) {
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
  }

  @ExceptionHandler({ InvalidTokenException.class })
  private ResponseEntity<?> invalidToken(RuntimeException e) {
    return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
  }

  @ExceptionHandler({ RuntimeException.class })
  private ResponseEntity<?> runtimeError(RuntimeException e) {
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
  }
}