package com.cojeans.osiopso.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.boot.context.properties.bind.DefaultValue;
@ToString
@Getter @Setter @SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class ApiResponseDto {
    private boolean success;
    private String message;
    private Object responseData;
}