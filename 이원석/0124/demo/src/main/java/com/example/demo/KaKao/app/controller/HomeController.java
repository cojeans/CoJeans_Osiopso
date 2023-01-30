package com.example.demo.KaKao.app.controller;

import com.example.demo.KaKao.app.service.UserServiceImpl;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@Controller
@RequiredArgsConstructor
public class HomeController {

    private final UserServiceImpl userService;

    @GetMapping("/login")
    @ResponseBody
    public ResponseEntity<?> kakaoLogin(@RequestParam("code") String authorizedCode, HttpSession session) {
        System.out.println(authorizedCode);
        // authorizedCode: 카카오 서버로부터 받은 인가 코드
        userService.kakaoLogin(authorizedCode);

        session.setAttribute("userId", "SUCCESS");

        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(URI.create("/"));

        Object userId = session.getAttribute("userId");
        System.out.println(userId);

        return new ResponseEntity<>(headers, HttpStatus.MOVED_PERMANENTLY);
    }

    @GetMapping("/logout")
    public String kakaoLogout(HttpSession session) {
        session.removeAttribute("userId");

        return "redirect:/";
    }
}
