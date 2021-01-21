package com.miko.petbook.mappers;

import com.miko.petbook.dtos.UserDto;
import com.miko.petbook.exceptions.UserNotFoundException;
import com.miko.petbook.models.User;
import com.miko.petbook.repositories.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class UserMapper {

  private final UserRepository userRepo;
  private final PasswordEncoder encoder;

  public UserDto mapToUserDto(User user) throws UserNotFoundException {
    return UserDto.builder().id(user.getId()).email(user.getEmail()).firstName(user.getFirstName())
        .lastName(user.getLastName()).password("").image(user.getImage()).build();
  }

  public User mapToUser(UserDto userDto) throws UserNotFoundException {
    User user = userRepo.findById(userDto.getId())
        .orElseThrow(() -> new UserNotFoundException("Error: cannot map user to userDto, user not found"));

    if (userDto.getEmail() != null || !(userDto.getEmail().equals(user.getEmail())))
      user.setEmail(userDto.getEmail());

    if (user.getFirstName() != null || !(userDto.getFirstName().equals(user.getFirstName())))
      user.setFirstName(userDto.getFirstName());

    if (user.getLastName() != null || !(userDto.getLastName().equals(user.getLastName())))
      user.setLastName(userDto.getLastName());

    if (user.getPassword() != null || !(userDto.getPassword().equals(user.getPassword())))
      user.setPassword(encoder.encode(userDto.getPassword()));

    user.setImage(userDto.getImage());

    return user;
  }
}