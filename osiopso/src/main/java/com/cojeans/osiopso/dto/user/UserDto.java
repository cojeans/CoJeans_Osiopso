package com.cojeans.osiopso.dto.user;

import com.cojeans.osiopso.entity.user.AuthProvider;
import com.cojeans.osiopso.entity.user.Gender;
import com.cojeans.osiopso.entity.user.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

@Getter @Setter @Builder @AllArgsConstructor @NoArgsConstructor
@ToString
public class UserDto {

    private Long id;

    private NotificationEmail name;

    private NotificationEmail email;

    private int age;

    private Gender gender;

    @JsonIgnore
    private NotificationEmail password;

    private NotificationEmail imageUrl;

    private Boolean emailVerified;

    private AuthProvider provider;

    private NotificationEmail providerId;

    private Boolean Followed;

    private NotificationEmail bio;//자기소개

    private Boolean isProfilePublic; //프로필 공개범위

    private Role role; //권한

}
