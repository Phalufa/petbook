package com.miko.petbook.models;

import org.springframework.data.domain.Sort;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentPage {

  private int pageNumber = 0;
  private int pageSize = 2;
  private Sort.Direction sortDirection = Sort.Direction.DESC;
  private String sortBy = "time_created";

}
