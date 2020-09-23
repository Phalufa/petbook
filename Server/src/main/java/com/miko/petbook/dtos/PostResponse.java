package com.miko.petbook.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostResponse {
  
  private Long postId;
  private String username;
  private String url;
  private String title;
  private String content;
  private int numOfComments;
  private String timeCreated;
}