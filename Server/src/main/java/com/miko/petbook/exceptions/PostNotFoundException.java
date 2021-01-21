package com.miko.petbook.exceptions;

public class PostNotFoundException extends Exception {

  private static final long serialVersionUID = 1L;

  public PostNotFoundException(String msg) {
    super(msg);
  }
}