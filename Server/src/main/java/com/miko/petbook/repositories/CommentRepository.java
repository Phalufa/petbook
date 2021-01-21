package com.miko.petbook.repositories;

import java.util.List;

import com.miko.petbook.models.Comment;
import com.miko.petbook.models.Post;
import com.miko.petbook.models.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CommentRepository extends JpaRepository<Comment, Long> {

  long countByPostId(Long id);

  List<Comment> findAllByPost(Post post);

  List<Comment> findAllByUser(User user);

  @Modifying
  @Query(value = "UPDATE comments SET content = :content WHERE id = :commentId", nativeQuery = true)
  int update(@Param("commentId") Long commentId, @Param("content") String content);
}