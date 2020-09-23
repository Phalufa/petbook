package com.miko.petbook.controllers;

import com.miko.petbook.dtos.PostRequest;
import com.miko.petbook.exceptions.NotAllowedException;
import com.miko.petbook.exceptions.PostNotFoundException;
import com.miko.petbook.exceptions.UserNotFoundException;
import com.miko.petbook.services.PostService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("api/posts")
@AllArgsConstructor
public class PostController {
  
  private final PostService postService;

  @PostMapping
  public ResponseEntity<?> createPost(@RequestBody PostRequest request) {
    return ResponseEntity.status(201).body(postService.createPost(request));
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> getPost(@PathVariable Long id) throws PostNotFoundException {
    return ResponseEntity.ok(postService.getPost(id));
  }

  @GetMapping
  public ResponseEntity<?> getAllPosts() {
    return ResponseEntity.ok(postService.getAllPosts());
  }

  @GetMapping("/by-user/{username}")
  public ResponseEntity<?> getPostsByUsername(@PathVariable String username) throws UserNotFoundException {
    return ResponseEntity.ok(postService.getPostsByUsername(username));
  }

  @PatchMapping("/{id}")
  public ResponseEntity<?> updatePost(@RequestBody PostRequest request, @PathVariable Long id) 
                                             throws NotAllowedException, PostNotFoundException {
    return ResponseEntity.ok(postService.updatePost(request, request.getId()));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> deletePost(@PathVariable Long id) throws NotAllowedException {
    int status = postService.deletePost(id);
    return status == 204 ? 
                ResponseEntity.status(status).build() : 
                ResponseEntity.ok("Post has been deleted successfully");
  }
}