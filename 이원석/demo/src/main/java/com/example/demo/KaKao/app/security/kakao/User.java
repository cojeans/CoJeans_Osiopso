package com.example.demo.KaKao.app.security.kakao;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class User {
    private Long id;
    private String email;
    private String nickname;
}
