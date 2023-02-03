package com.oauth.demo.dto;

import com.oauth.demo.entity.Role;
import com.oauth.demo.entity.User;
import lombok.Getter;


@Getter
public class SignupForm {
//    @NotBlank(message = "이름을 입력해주세요.")
    private String name;
//    @NotBlank(message = "이메일 주소를 입력해주세요.")
//    @Email(message = "올바른 형식의 이메일 주소를 입력해주세요.")
    private String email;
//    @NotBlank(message = "비밀번호를 입력해주세요.")
    private String password;

    public User toEntity(String encPwd) {
        return User.builder()
            .name(name)
            .email(email)
            .password(encPwd)
            .role(Role.ROLE_USER)
            .build();
    }
}
