package com.cojeans.osiopso.dto.response.feed;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class HotOotdResponseDto {
    private Long id;
    private String imageUrl;
}
