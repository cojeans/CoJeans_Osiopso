package com.example.demo.KaKao.app.controller;

import com.example.demo.KaKao.app.service.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class HomeController {

    private final UserServiceImpl userService;

    @GetMapping("/login")
    public String kakaoLogin(String authorizedCode) {
        // authorizedCode: 카카오 서버로부터 받은 인가 코드
        userService.kakaoLogin(authorizedCode);

        return "redirect:/";
    }



}
