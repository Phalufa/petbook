package com.miko.petbook.services;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import com.miko.petbook.bucket.BucketName;
import com.miko.petbook.dtos.UserDto;
import com.miko.petbook.exceptions.NotAllowedException;
import com.miko.petbook.exceptions.UserAlreadyExistsException;
import com.miko.petbook.exceptions.UserNotFoundException;
import com.miko.petbook.mappers.UserMapper;
import com.miko.petbook.models.User;
import com.miko.petbook.repositories.UserRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class UserService {

  private final UserRepository userRepo;
  private final AuthService authService;
  private final UserMapper userMapper;
  private final ImageStorage imageStorage;

  public UserDto updateUserDetails(UserDto userDto)
      throws UserNotFoundException, NotAllowedException, UserAlreadyExistsException {
    User cUser = authService.getCurrentUser();
    if (cUser.getId() != userDto.getId())
      throw new NotAllowedException("Error: you are not allowed to update details");

    boolean userExists = userRepo.findAll().stream()
        .anyMatch(u -> u.getId() != userDto.getId() && u.getEmail().equals(userDto.getEmail()));

    if (userExists)
      throw new UserAlreadyExistsException("Please use another email address");

    User user = userMapper.mapToUser(userDto);
    return userMapper.mapToUserDto(userRepo.save(user));
  }

  @Transactional(readOnly = true)
  public UserDto getUserDetails() throws UserNotFoundException, NotAllowedException {
    User cUser = authService.getCurrentUser();
    return userMapper.mapToUserDto(cUser);
  }

  @Transactional(readOnly = true)
  public UserDto getOtherUserDetails(String username) throws UserNotFoundException, NotAllowedException {
    User user = userRepo.findByUsername(username)
        .orElseThrow(() -> new UserNotFoundException(username + " was not found"));
    return userMapper.mapToUserDto(user);
  }

  public String uploadImage(MultipartFile image, Long userId) throws NotAllowedException {
    if (image.isEmpty())
      throw new NotAllowedException("Cannot upload an empty image");

    switch (image.getContentType()) {
      case "image/jpeg":
      case "image/png":
      case "image/gif":
        break;
      default:
        throw new NotAllowedException("File must be an image");
    }

    Map<String, String> metadata = new HashMap<>();
    metadata.put("Content-Type", image.getContentType());
    metadata.put("Content-Length", String.valueOf(image.getSize()));

    User currentUser = authService.getCurrentUser();

    String path = String.format("%s/%s", BucketName.PROFILE_IMAGE.getBucketName(), currentUser.getUsername());
    String name = image.getOriginalFilename();

    try {
      imageStorage.saveImage(path, name, Optional.of(metadata), image.getInputStream());

      userRepo.findById(userId).ifPresent(user -> {
        user.setImage(name);
        userRepo.save(user);
      });
    } catch (IOException e) {
      throw new IllegalStateException(e);
    }

    return "Image has been uploded successfully";
  }

  public byte[] downloadUserProfileImage(Long userId) {
    User user = userRepo.findById(userId).orElseThrow();

    String path = String.format("%s/%s", BucketName.PROFILE_IMAGE.getBucketName(), user.getUsername());

    String imageLink = user.getImage();
    if (imageLink != null)
      return imageStorage.downloadImage(path, imageLink);

    return new byte[0];
  }

  public byte[] downloadUserProfileImage(String username) {
    User user = userRepo.findByUsername(username).orElseThrow();

    String path = String.format("%s/%s", BucketName.PROFILE_IMAGE.getBucketName(), user.getUsername());

    String imageLink = user.getImage();
    if (imageLink != null)
      return imageStorage.downloadImage(path, imageLink);

    return new byte[0];
  }
}