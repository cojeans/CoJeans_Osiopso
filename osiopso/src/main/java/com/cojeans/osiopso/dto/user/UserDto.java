package com.cojeans.osiopso.dto.user;

import com.cojeans.osiopso.entity.user.AuthProvider;
import com.cojeans.osiopso.entity.user.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

@Getter @Setter @Builder @AllArgsConstructor @NoArgsConstructor
@ToString
public class UserDto {

    private Long id;

    private String name;

    private String email;

    private int age;

    private Gender gender;

    @JsonIgnore
    private String password;

    private String imageUrl;

    private Boolean emailVerified;

    private AuthProvider provider;

    private String providerId;

    private Boolean Followed;

    private String bio;//자기소개

    private Boolean isProfilePublic; //프로필 공개범위

    private Role role; //권한

}
