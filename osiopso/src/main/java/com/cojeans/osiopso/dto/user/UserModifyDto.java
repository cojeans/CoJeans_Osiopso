package com.cojeans.osiopso.dto.user;

import com.cojeans.osiopso.entity.user.Gender;
import lombok.*;

/*
비밀번호수정, 공개범위설정은 다른 페이지 에서 하기에 마이페이지에서 바꾸는 필드는 아래4가지.
 */
@Getter @Setter @Builder @AllArgsConstructor @NoArgsConstructor
public class UserModifyDto {
    private Long id;

    private int age;

    private String name;

    private Gender gender;

    private String bio;
}
