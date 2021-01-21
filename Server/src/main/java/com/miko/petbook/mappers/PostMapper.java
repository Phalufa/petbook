package com.miko.petbook.mappers;

import java.time.Instant;

import com.miko.petbook.dtos.PostRequest;
import com.miko.petbook.dtos.PostResponse;
import com.miko.petbook.exceptions.PostNotFoundException;
import com.miko.petbook.models.Post;
import com.miko.petbook.models.User;
import com.miko.petbook.repositories.CommentRepository;
import com.miko.petbook.repositories.PostRepository;

import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class PostMapper {

  private final PostRepository postRepo;
  private final CommentRepository commentRepo;

  private static final String POST_URL = "http://localhost:8080/";

  public Post mapToPost(PostRequest request, User user) {
    if (request == null)
      throw new NullPointerException("Error: Post request cannot be null");

    return Post.builder().user(user).title(request.getTitle()).content(request.getContent())
        .url(generateUrl(request, user)).timeCreated(Instant.now()).build();
  }

  public PostResponse mapToPostResponse(Post post) {
    return PostResponse.builder().postId(post.getId()).username(post.getUser().getUsername())
        .userImage(post.getUser().getImage()).title(post.getTitle()).content(post.getContent()).url(post.getUrl())
        .numOfComments((int) (commentRepo.countByPostId(post.getId())))
        .timeCreated(MapperUtils.dateFormatter(post.getTimeCreated())).build();
  }

  public Post mapToPostForUpdate(PostRequest request) throws PostNotFoundException {
    Post post = postRepo.findById(request.getId())
        .orElseThrow(() -> new PostNotFoundException("Error: Post not found"));

    if (request.getTitle() != null || request.getTitle().equalsIgnoreCase(post.getTitle()))
      post.setTitle(request.getTitle());

    if (request.getContent() != null || !(request.getContent().equalsIgnoreCase(post.getContent())))
      post.setContent(request.getContent());

    return post;
  }

  private String generateUrl(PostRequest request, User user) {
    String titleWithDashes = request.getTitle().replaceAll(" ", "-");
    return String.format("%s%s-%s", POST_URL, user.getUsername(), titleWithDashes);
  }
}