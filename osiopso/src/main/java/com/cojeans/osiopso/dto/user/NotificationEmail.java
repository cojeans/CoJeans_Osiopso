package com.cojeans.osiopso.dto.user;

import lombok.*;

@Getter @Setter @Builder @AllArgsConstructor @NoArgsConstructor @ToString
public class NotificationEmail {
    private String subject;
    private String to;
    private String body;
}
