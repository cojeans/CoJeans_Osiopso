package com.cojeans.osiopso.dto.user;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FollowResponseDto {
    private Long id;
    private String name;
    private String email;
    private String imageUrl;
}
