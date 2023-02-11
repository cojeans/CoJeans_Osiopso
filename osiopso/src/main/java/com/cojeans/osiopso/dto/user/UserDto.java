package com.cojeans.osiopso.dto.user;

import com.cojeans.osiopso.entity.user.AuthProvider;
import lombok.*;

@Getter @Setter @Builder @AllArgsConstructor @NoArgsConstructor
@ToString
public class UserDto {

    private Long id;

    private String name;

    private String email;

    private int age;

    private Gender gender;

    private String password;

    private String imageUrl;

    private Boolean emailVerified;

    private AuthProvider provider;

    private String providerId;

    private boolean Followed;

}
