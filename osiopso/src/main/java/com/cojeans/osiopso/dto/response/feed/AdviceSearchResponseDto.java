package com.cojeans.osiopso.dto.response.feed;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AdviceSearchResponseDto {

    private Long articleNo;
    private String subject;
    private boolean isSelected;
    private ArticlePhotoResponseDto photo;
    private Long commentCnt;
    private String Time;
}
