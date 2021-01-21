package com.miko.petbook.exceptions;

public class InvalidTokenException extends RuntimeException {

  private static final long serialVersionUID = 1L;

  public InvalidTokenException(String msg) {
    super(msg);
  }

  public InvalidTokenException(String msg, Exception e) {
    super(msg, e);
  }
}