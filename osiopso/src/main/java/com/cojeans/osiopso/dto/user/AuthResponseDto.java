package com.cojeans.osiopso.dto.user;


import com.cojeans.osiopso.dto.ApiResponseDto;
import lombok.*;
import lombok.experimental.SuperBuilder;

@SuperBuilder @Getter @Setter @AllArgsConstructor @NoArgsConstructor
public class AuthResponseDto extends ApiResponseDto {
    private NotificationEmail accessToken;
    private NotificationEmail tokenType = "Bearer";

    public AuthResponseDto(NotificationEmail accessToken) {
        super();
        this.accessToken = accessToken;
    }
}
