package com.miko.petbook.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentDto {
  
  private Long id;
  private Long postId;
  private String username;
  private String content;
  private String timeCreated;
}