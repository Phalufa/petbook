package com.miko.petbook.repositories;

import java.util.List;

import com.miko.petbook.models.Post;
import com.miko.petbook.models.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PostRepository extends JpaRepository<Post, Long> {

  List<Post> findAllByUser(User user);

  @Modifying
  @Query(value = "UPDATE posts SET title = :title, content = :content WHERE id = :postId", nativeQuery = true)
  int update(@Param("postId") Long postId, @Param("title") String title, @Param("content") String content);
}