package com.cojeans.osiopso.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.boot.context.properties.bind.DefaultValue;
@ToString
@Getter @Setter @SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class ApiResponseDto {
    protected boolean success;
    protected String message;
    protected Object responseData;
}
