package com.cojeans.osiopso.dto.response.tag;

import com.cojeans.osiopso.dto.response.feed.HotOotdResponseDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class HotTagResponseDto {
    private Long id;
    private String keyword;
    private List<HotOotdResponseDto> hotList;
}
