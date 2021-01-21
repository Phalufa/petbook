package com.miko.petbook.mappers;

import java.time.Instant;

import com.miko.petbook.dtos.CommentDto;
import com.miko.petbook.exceptions.CommentNotFoundException;
import com.miko.petbook.models.Comment;
import com.miko.petbook.models.Post;
import com.miko.petbook.models.User;
import com.miko.petbook.repositories.CommentRepository;

import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class CommentMapper {

  private final CommentRepository commentRepo;

  public Comment mapToComment(CommentDto commentDto, Post post, User user) {
    if (commentDto == null)
      throw new NullPointerException("Error: CommentDto cannot be null");

    if (commentDto.getContent() == null || commentDto.getContent().length() < 1)
      throw new NullPointerException("Error: CommentDto content cannot be empty");

    return Comment.builder().post(post).user(user).content(commentDto.getContent()).timeCreated(Instant.now()).build();
  }

  public CommentDto mapToCommentDto(Comment comment) {
    return CommentDto.builder().id(comment.getId()).postId(comment.getPost().getId())
        .username(comment.getUser().getUsername()).content(comment.getContent())
        .timeCreated(MapperUtils.dateFormatter(comment.getTimeCreated())).build();
  }

  public Comment mapToCommentForUpdate(CommentDto commentDto) throws CommentNotFoundException {
    Comment comment = commentRepo.findById(commentDto.getId())
        .orElseThrow(() -> new CommentNotFoundException("Error: Comment not found"));

    if (!commentDto.getPostId().equals(comment.getPost().getId()))
      throw new CommentNotFoundException("Error: the comment to update has a different post id");

    if (commentDto.getContent() != null || !(commentDto.getContent().equalsIgnoreCase(comment.getContent())))
      comment.setContent(commentDto.getContent());

    return comment;
  }
}