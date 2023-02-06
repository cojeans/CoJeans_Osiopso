package com.cojeans.osiopso.dto;

import lombok.*;
import org.springframework.boot.context.properties.bind.DefaultValue;
@ToString
@Getter @Setter @Builder
@AllArgsConstructor
@NoArgsConstructor
public class ApiResponseDto<T> {
    private boolean success;
    private String message;

    private T responseData;


    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
