package com.miko.petbook.dtos;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignupRequest {

  private String username;
  private String email;
  private String password;
  private Date dateOfBirth;
  private String firstName;
  private String lastName;

}
