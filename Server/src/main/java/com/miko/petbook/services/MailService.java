package com.miko.petbook.services;

import com.miko.petbook.exceptions.MailServiceException;
import com.miko.petbook.models.EmailNotification;

import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@AllArgsConstructor
public class MailService {

  private final static String EMAIL_FROM = "miko@petbook.com";

  private final JavaMailSender mailSender;
  private final MailBuilderService mailBuilder;

  @Async
  public void sendEmail(EmailNotification notification) {
    MimeMessagePreparator preparator = mimeMessage -> {
      MimeMessageHelper helper = new MimeMessageHelper(mimeMessage);
      helper.setFrom(EMAIL_FROM);
      helper.setTo(notification.getRecipient());
      helper.setSubject(notification.getSubject());
      helper.setText(mailBuilder.build(notification.getContent()));
    };
    try {
      mailSender.send(preparator);
      log.info("Activation email sent!!");
    } catch (MailException e) {
      log.error("Exception occurred when sending mail", e);
      throw new MailServiceException("Exception occurred when sending mail to " + notification.getRecipient());
    }
  }
}