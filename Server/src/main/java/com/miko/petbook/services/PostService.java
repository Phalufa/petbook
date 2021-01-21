package com.miko.petbook.services;

import com.miko.petbook.dtos.PostRequest;
import com.miko.petbook.dtos.PostResponse;
import com.miko.petbook.exceptions.NotAllowedException;
import com.miko.petbook.exceptions.PostNotFoundException;
import com.miko.petbook.exceptions.UserNotFoundException;
import com.miko.petbook.mappers.PostMapper;
import com.miko.petbook.models.Post;
import com.miko.petbook.models.PostPage;
import com.miko.petbook.models.User;
import com.miko.petbook.repositories.CommentRepository;
import com.miko.petbook.repositories.PostRepository;
import com.miko.petbook.repositories.UserRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class PostService {

  private final AuthService authService;
  private final PostRepository postRepo;
  private final CommentRepository commentRepo;
  private final UserRepository userRepo;
  private final PostMapper postMapper;

  public PostResponse createPost(PostRequest request) {
    User cUser = authService.getCurrentUser();
    Post post = postMapper.mapToPost(request, cUser);
    return postMapper.mapToPostResponse(postRepo.save(post));
  }

  @Transactional(readOnly = true)
  public PostResponse getPost(Long id) throws PostNotFoundException {
    Post post = postRepo.findById(id).orElseThrow(() -> new PostNotFoundException("Error: Post not found"));
    return postMapper.mapToPostResponse(post);
  }

  @Transactional(readOnly = true)
  public List<PostResponse> getAllPosts() {
    return postRepo.findAll().stream().map(post -> postMapper.mapToPostResponse(post)).collect(Collectors.toList());
  }

  @Transactional(readOnly = true)
  public List<PostResponse> getPostsByUsername(String username) throws UserNotFoundException {
    User user = userRepo.findByUsername(username)
        .orElseThrow(() -> new UserNotFoundException(String.format("Error: %s not found", username)));
    return postRepo.findAllByUser(user).stream().map(post -> postMapper.mapToPostResponse(post))
        .collect(Collectors.toList());
  }

  public PostResponse updatePost(PostRequest request, Long id) throws PostNotFoundException, NotAllowedException {
    Post oldPost = postRepo.findById(id).orElseThrow(() -> new PostNotFoundException("Error: Post not found"));
    User cUser = authService.getCurrentUser();
    if (!(oldPost.getUser().equals(cUser)))
      throw new NotAllowedException("Error: You are not allowed to edit the post");

    Post modifiedPost = postMapper.mapToPostForUpdate(request);
    postRepo.update(modifiedPost.getId(), modifiedPost.getTitle(), modifiedPost.getContent());
    return postMapper.mapToPostResponse(postRepo.findById(id).get());
  }

  public int deletePost(Long id) throws NotAllowedException {
    int httpStatus = 204;
    if (postRepo.existsById(id)) {
      User cUser = authService.getCurrentUser();

      if (!(cUser.equals(postRepo.findById(id).get().getUser())))
        throw new NotAllowedException("Error: You are not allowed to delete the post");

      commentRepo.findAllByPost(postRepo.findById(id).get())
          .forEach(comment -> commentRepo.deleteById(comment.getId()));

      postRepo.deleteById(id);
      httpStatus = 200;
    }
    return httpStatus;
  }

  public Page<PostResponse> getPostsByPage(PostPage page) {
    Sort sort = Sort.by(page.getSortDirection(), page.getSortBy());
    Pageable pageable = PageRequest.of(page.getPageNumber(), page.getPageSize(), sort);
    return postRepo.findAll(pageable).map(post -> postMapper.mapToPostResponse(post));
  }
}