package com.example.springsocial.dto;


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
public class SignUpRequest {
    private String name;

    private String email;

    private String password;

}
