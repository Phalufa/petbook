package com.miko.petbook.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

  private Long id;
  private String email;
  private String password;
  private String firstName;
  private String lastName;
  private String image;
}