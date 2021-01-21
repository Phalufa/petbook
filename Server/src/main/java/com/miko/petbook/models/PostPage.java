package com.miko.petbook.models;

import org.springframework.data.domain.Sort;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostPage {

  private int pageNumber = 0;
  private int pageSize = 4;
  private Sort.Direction sortDirection = Sort.Direction.DESC;
  private String sortBy = "timeCreated";
}
