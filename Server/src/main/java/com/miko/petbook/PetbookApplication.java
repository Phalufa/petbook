package com.miko.petbook;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class PetbookApplication {

	public static void main(String[] args) {
		SpringApplication.run(PetbookApplication.class, args);
	}

}
