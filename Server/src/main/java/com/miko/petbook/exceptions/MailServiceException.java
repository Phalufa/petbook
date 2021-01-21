package com.miko.petbook.exceptions;

public class MailServiceException extends RuntimeException {

  private static final long serialVersionUID = 1L;

  public MailServiceException(String msg) {
    super(msg);
  }
}
