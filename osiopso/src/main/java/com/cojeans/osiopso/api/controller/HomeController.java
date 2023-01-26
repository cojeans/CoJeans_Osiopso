package com.cojeans.osiopso.api.controller;


import com.cojeans.osiopso.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

@RestController
@RequiredArgsConstructor
public class HomeController {

    private final UserService userService;

    /**
     * KAKAO 소셜 로그인 기능
     * @return ResponseEntity<AuthResponse>
     */
    @GetMapping("/user/kakao/callback")
    public String kakaoLogin(@RequestParam("code") String code) throws Exception {
        // authorizedCode: 카카오 서버로부터 받은 인가 코드
        System.out.println(code);
        userService.kakaoLogin(code);
//        httpSession.setAttribute("code", );

        return "로그인 성공!!";
    }
}
