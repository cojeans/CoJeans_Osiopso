package com.cojeans.osiopso.dto;

import lombok.*;
import org.springframework.boot.context.properties.bind.DefaultValue;
@ToString
@Getter @Setter @Builder
public class ApiResponseDto {
    public boolean success;
    public String message;

    public ApiResponseDto(@DefaultValue("true") boolean success, @DefaultValue("success")String message) {
        this.success = success;
        this.message = message;
    }

    public ApiResponseDto() {
        this.success = true;
        this.message = "success";
    }

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
