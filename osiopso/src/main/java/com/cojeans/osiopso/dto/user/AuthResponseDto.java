package com.cojeans.osiopso.dto.user;


import com.cojeans.osiopso.dto.ApiResponseDto;
import lombok.*;
import lombok.experimental.SuperBuilder;

@SuperBuilder @Getter @Setter @AllArgsConstructor @NoArgsConstructor
public class AuthResponseDto extends ApiResponseDto {
    private String accessToken;
    private String tokenType = "Bearer";

    public AuthResponseDto(String accessToken) {
        super();
        this.accessToken = accessToken;
    }
}
