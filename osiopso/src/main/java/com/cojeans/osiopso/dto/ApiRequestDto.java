package com.cojeans.osiopso.dto;

import lombok.*;

@ToString @Getter @Setter @AllArgsConstructor @NoArgsConstructor @Builder
public class ApiRequestDto {
    protected boolean success;
    protected String message;



}
