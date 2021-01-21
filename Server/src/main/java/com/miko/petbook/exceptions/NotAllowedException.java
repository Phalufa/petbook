package com.miko.petbook.exceptions;

public class NotAllowedException extends Exception {

  private static final long serialVersionUID = 1L;

  public NotAllowedException(String msg) {
    super(msg);
  }

}