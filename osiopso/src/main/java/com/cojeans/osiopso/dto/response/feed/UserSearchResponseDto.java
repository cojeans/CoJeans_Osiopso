package com.cojeans.osiopso.dto.response.feed;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserSearchResponseDto {

    private Long userId;
    private String userName;
    private String profileImageUrl;
}
