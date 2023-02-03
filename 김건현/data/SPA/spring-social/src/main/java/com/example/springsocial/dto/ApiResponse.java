package com.example.springsocial.dto;

import com.fasterxml.jackson.databind.ObjectMapper;
import net.bytebuddy.implementation.bind.annotation.Default;
import org.springframework.boot.context.properties.bind.DefaultValue;

public class ApiResponse {
    public boolean success;
    public String message;

    public ApiResponse(@DefaultValue("true") boolean success, @DefaultValue("success")String message) {
        this.success = success;
        this.message = message;
    }

    public ApiResponse() {
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
