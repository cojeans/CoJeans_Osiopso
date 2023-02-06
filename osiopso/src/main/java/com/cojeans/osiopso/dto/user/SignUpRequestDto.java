package com.cojeans.osiopso.dto.user;


import lombok.*;

/**
 * Created by rajeevkumarsingh on 02/08/17.
 */

@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
public class SignUpRequestDto {
    private String name;

    private String email;

    private String password;

    private int age;

    private Gender gender;

}
