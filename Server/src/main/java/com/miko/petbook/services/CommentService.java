package com.miko.petbook.services;

import java.util.List;
import java.util.stream.Collectors;

import com.miko.petbook.dtos.CommentDto;
import com.miko.petbook.exceptions.CommentNotFoundException;
import com.miko.petbook.exceptions.NotAllowedException;
import com.miko.petbook.exceptions.PostNotFoundException;
import com.miko.petbook.mappers.CommentMapper;
import com.miko.petbook.models.Comment;
import com.miko.petbook.models.Post;
import com.miko.petbook.models.User;
import com.miko.petbook.repositories.CommentRepository;
import com.miko.petbook.repositories.PostRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class CommentService {

  private final CommentRepository commentRepo;
  private final PostRepository postRepo;
  private final AuthService authService;
  private final CommentMapper commentMapper;

  public CommentDto createComment(CommentDto commentDto) throws PostNotFoundException {
    Post post = postRepo.findById(commentDto.getPostId())
                        .orElseThrow(() -> new PostNotFoundException("Error: Post not found - cannot map to comment"));
    Comment comment = commentMapper.mapToComment(commentDto, post, authService.getCurrentUser());
    return commentMapper.mapToCommentDto(commentRepo.save(comment));
  }

  public CommentDto updateComment(CommentDto commentDto, Long commentId) throws CommentNotFoundException, NotAllowedException {
    Comment oldComment = commentRepo.findById(commentId)
                                 .orElseThrow(() -> new CommentNotFoundException("Error: Comment not found"));
    User cUser = authService.getCurrentUser();
    if (!(oldComment.getUser().equals(cUser)))
      throw new NotAllowedException("Error: You are not allowed to edit this comment");

    Comment modifiedComment = commentMapper.mapToCommentForUpdate(commentDto);
    commentRepo.update(modifiedComment.getId(), modifiedComment.getContent());
    return commentMapper.mapToCommentDto(commentRepo.findById(commentId).get());
  }
  
  @Transactional(readOnly = true)
  public CommentDto getComment(Long id) throws CommentNotFoundException {
    Comment comment = commentRepo.findById(id)
                                 .orElseThrow(() -> new CommentNotFoundException("Error: Comment not found"));
    return commentMapper.mapToCommentDto(comment);
  }

  @Transactional(readOnly = true)
  public List<CommentDto> getAllPostComments(Long postId) throws PostNotFoundException {
    Post post = postRepo.findById(postId).orElseThrow(() -> new PostNotFoundException("Error: cannot retrieve comments - post not found"));
    return commentRepo.findAllByPost(post)
                      .stream()
                      .map(comment -> commentMapper.mapToCommentDto(comment))
                      .collect(Collectors.toList());
  }

  @Transactional(readOnly = true)
  public List<CommentDto> getAllCommentsByUser() {
    return commentRepo.findAllByUser(authService.getCurrentUser())
                      .stream()
                      .map(comment -> commentMapper.mapToCommentDto(comment))
                      .collect(Collectors.toList());
  }

  public int deleteComment(Long id) throws NotAllowedException {
    int httpStatus = 204;
    if (commentRepo.existsById(id)) {
      User cUser = authService.getCurrentUser();

      if (!(cUser.equals(commentRepo.findById(id).get().getUser())))
        throw new NotAllowedException("Error: You are not allowed to delete the comment");

      commentRepo.deleteById(id);
      httpStatus = 200;
    }
    return httpStatus;
  }
}