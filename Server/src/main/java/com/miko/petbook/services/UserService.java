package com.miko.petbook.services;

import com.miko.petbook.dtos.UserDto;
import com.miko.petbook.exceptions.NotAllowedException;
import com.miko.petbook.exceptions.UserNotFoundException;
import com.miko.petbook.mappers.UserMapper;
import com.miko.petbook.models.User;
import com.miko.petbook.repositories.UserRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class UserService {
  
  private final UserRepository userRepo;
  private final AuthService authService;
  private final UserMapper userMapper;

  public UserDto updateUserDetails(UserDto userDto) throws UserNotFoundException, NotAllowedException {
    User cUser = authService.getCurrentUser();
    if (cUser.getId() != userDto.getId())
      throw new NotAllowedException("Error: you are not allowed to update details");
      
    User user = userMapper.mapToUser(userDto);
    return userMapper.mapToUserDto(userRepo.save(user));
  }
}