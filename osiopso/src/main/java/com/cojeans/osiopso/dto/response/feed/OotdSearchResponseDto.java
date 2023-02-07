package com.cojeans.osiopso.dto.response.feed;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OotdSearchResponseDto {

    private Long articleNo;
    private ArticlePhotoResponseDto photo;
    private Long commentCnt;
    private String Time;
    private Long likeCnt;
}
