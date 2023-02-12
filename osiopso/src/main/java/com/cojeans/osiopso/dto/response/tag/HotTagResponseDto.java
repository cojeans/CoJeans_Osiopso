package com.cojeans.osiopso.dto.response.tag;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class HotTagResponseDto {
    private Long id;
    private String keyword;
}
