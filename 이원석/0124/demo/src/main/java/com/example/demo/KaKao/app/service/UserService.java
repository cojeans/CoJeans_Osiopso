package com.example.demo.KaKao.app.service;


import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService {

    void kakaoLogin(String authorizedCode);
}
