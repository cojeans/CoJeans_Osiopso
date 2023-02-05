package com.cojeans.osiopso.dto.response.feed;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ArticleLikeResponseDto {
    private final Long id;
    private final Long userId;
}
