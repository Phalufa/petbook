package com.miko.petbook.exceptions;

public class CommentNotFoundException extends Exception {

  private static final long serialVersionUID = 1L;

  public CommentNotFoundException(String msg) {
    super(msg);
  }
}