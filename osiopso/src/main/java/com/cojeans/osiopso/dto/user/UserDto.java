package com.cojeans.osiopso.dto.user;

import com.cojeans.osiopso.entity.user.AuthProvider;
import lombok.*;

@Getter @Setter @Builder @AllArgsConstructor @NoArgsConstructor
public class UserDto {

    private Long id;

    private String name;

    private String email;

    private String imageUrl;

    private Boolean emailVerified;

    private String password;

    private AuthProvider provider;

    private String providerId;
}
