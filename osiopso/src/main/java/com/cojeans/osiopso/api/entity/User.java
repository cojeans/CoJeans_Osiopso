package com.cojeans.osiopso.api.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(name = "user_email")
    private String email;

    // 소셜로그인은 uuid or default
    @Column(name = "user_password")
    private String password;

    @Column(name = "user_nickname")
    private String nickname;

    @Column(name = "birth", nullable = true)
    private String birth;

    @Column(name = "gender", nullable = true)
    private String gender;

    // Role
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    // 소셜로그인
    private String provider;

    @Column(name = "access_token")
    private String accessToken;

    @Column(name = "refresh_token")
    private String refreshToken;
}
