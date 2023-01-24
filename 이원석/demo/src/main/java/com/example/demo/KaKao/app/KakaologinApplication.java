package com.example.demo.KaKao.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;

@SpringBootApplication
public class KakaologinApplication {

    public static void main(String[] args) {
        SpringApplication.run(KakaologinApplication.class, args);
    }

}
