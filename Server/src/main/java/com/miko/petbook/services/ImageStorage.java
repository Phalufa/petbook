package com.miko.petbook.services;

import java.io.InputStream;
import java.util.Map;
import java.util.Optional;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.util.IOUtils;
import com.amazonaws.services.s3.model.ObjectMetadata;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class ImageStorage {

  private final AmazonS3 s3;

  @Autowired
  public ImageStorage(AmazonS3 s3) {
    this.s3 = s3;
  }

  public void saveImage(String path, String fileName, Optional<Map<String, String>> optMetaData,
      InputStream inputStream) {
    ObjectMetadata metadata = new ObjectMetadata();
    optMetaData.ifPresent(map -> {
      if (!map.isEmpty())
        map.forEach(metadata::addUserMetadata);
    });
    try {
      s3.putObject(path, fileName, inputStream, metadata);
    } catch (AmazonServiceException e) {
      throw new IllegalStateException("Failed to store file to s3", e);
    }
  }

  public byte[] downloadImage(String path, String key) {
    try {
      S3Object object = s3.getObject(path, key);
      return IOUtils.toByteArray(object.getObjectContent());
    } catch (AmazonServiceException | IOException e) {
      System.out.println(e.getMessage());
      throw new IllegalStateException("Failed to download file to s3", e);
    }
  }
}
