package com.miko.petbook.controllers;

import com.miko.petbook.dtos.UserDto;
import com.miko.petbook.exceptions.NotAllowedException;
import com.miko.petbook.exceptions.UserNotFoundException;
import com.miko.petbook.services.UserService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/users")
@AllArgsConstructor
public class UserController {
  
  private final UserService userService;

  @PutMapping
  public ResponseEntity<?> updateUserDetails(@RequestBody UserDto userDto) throws UserNotFoundException, NotAllowedException {
    return ResponseEntity.ok(userService.updateUserDetails(userDto));
  }
}