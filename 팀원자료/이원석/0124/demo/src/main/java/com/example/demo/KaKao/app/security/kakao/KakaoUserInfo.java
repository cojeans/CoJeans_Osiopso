package com.example.demo.KaKao.app.security.kakao;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@AllArgsConstructor
@Getter
@ToString(exclude = "KakaoUserInfo")
public class KakaoUserInfo {
    Long id;
    String email;
    String nickname;
}
