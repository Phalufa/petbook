package com.miko.petbook.controllers;

import com.miko.petbook.dtos.UserDto;
import com.miko.petbook.exceptions.NotAllowedException;
import com.miko.petbook.exceptions.UserAlreadyExistsException;
import com.miko.petbook.exceptions.UserNotFoundException;
import com.miko.petbook.services.UserService;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/user")
@AllArgsConstructor
public class UserController {

  private final UserService userService;

  @PutMapping()
  public ResponseEntity<?> updateUserDetails(@RequestBody UserDto userDto)
      throws UserNotFoundException, NotAllowedException, UserAlreadyExistsException {
    return ResponseEntity.ok(userService.updateUserDetails(userDto));
  }

  @GetMapping()
  public ResponseEntity<?> getUserDetails() throws UserNotFoundException, NotAllowedException {
    return ResponseEntity.ok(userService.getUserDetails());
  }

  @GetMapping("/{username}")
  public ResponseEntity<?> getOtherUserDetails(@PathVariable("username") String username)
      throws UserNotFoundException, NotAllowedException {
    return ResponseEntity.ok(userService.getOtherUserDetails(username));
  }

  @PostMapping(path = "/{userId}/image/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<?> uploadUserImage(@RequestParam("image") MultipartFile image,
      @PathVariable("userId") Long userId) throws NotAllowedException {
    return ResponseEntity.ok(userService.uploadImage(image, userId));
  }

  @GetMapping(path = "/{userId}/image/download", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
  public ResponseEntity<?> downloadUserProfileImage(@PathVariable("userId") Long userId) {
    return ResponseEntity.ok(userService.downloadUserProfileImage(userId));
  }

  @GetMapping(path = "/image/profile/{username}/download", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
  public ResponseEntity<?> downloadUserProfileImage(@PathVariable("username") String username) {
    return ResponseEntity.ok(userService.downloadUserProfileImage(username));
  }
}