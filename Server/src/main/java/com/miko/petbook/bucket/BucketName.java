package com.miko.petbook.bucket;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
public enum BucketName {

  PROFILE_IMAGE("petbook-images");

  @Getter
  private final String bucketName;
}