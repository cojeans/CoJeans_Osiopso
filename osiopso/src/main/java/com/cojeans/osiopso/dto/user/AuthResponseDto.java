package com.cojeans.osiopso.dto.user;


import com.cojeans.osiopso.dto.ApiResponseDto;

public class AuthResponseDto extends ApiResponseDto {
    private String accessToken;
    private String tokenType = "Bearer";

    public AuthResponseDto(String accessToken) {
        super();
        this.accessToken = accessToken;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }
}
