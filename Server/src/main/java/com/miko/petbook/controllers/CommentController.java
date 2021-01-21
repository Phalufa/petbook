package com.miko.petbook.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

import com.miko.petbook.dtos.CommentDto;
import com.miko.petbook.exceptions.CommentNotFoundException;
import com.miko.petbook.exceptions.NotAllowedException;
import com.miko.petbook.exceptions.PostNotFoundException;
import com.miko.petbook.services.CommentService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/comments")
@AllArgsConstructor
public class CommentController {

  private final CommentService commentService;

  @PostMapping
  public ResponseEntity<?> createComment(@RequestBody CommentDto commentDto) throws PostNotFoundException {
    return ResponseEntity.status(201).body(commentService.createComment(commentDto));
  }

  @PatchMapping("/{id}")
  public ResponseEntity<?> updateComment(@RequestBody CommentDto commentDto, @PathVariable Long id)
      throws NotAllowedException, CommentNotFoundException {
    return ResponseEntity.ok(commentService.updateComment(commentDto, id));
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> getComment(@PathVariable Long id) throws CommentNotFoundException {
    return ResponseEntity.ok(commentService.getComment(id));
  }

  @GetMapping("/by-post/{postId}")
  public ResponseEntity<?> getAllPostComments(@PathVariable Long postId) throws PostNotFoundException {
    return ResponseEntity.ok(commentService.getAllPostComments(postId));
  }

  @GetMapping
  public ResponseEntity<?> getAllCommentsByUser() {
    return ResponseEntity.ok(commentService.getAllCommentsByUser());
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteComment(@PathVariable Long id) throws NotAllowedException {
    int status = commentService.deleteComment(id);
    return status == 204 ? ResponseEntity.status(status).build()
        : ResponseEntity.ok("Comment has been deleted successfully");
  }
}