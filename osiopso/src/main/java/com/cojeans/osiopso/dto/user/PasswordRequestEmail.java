package com.cojeans.osiopso.dto.user;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class PasswordRequestEmail {
    private java.lang.String subject;
    private java.lang.String to;
    private java.lang.String body;
}
