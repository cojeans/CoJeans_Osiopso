package com.cojeans.osiopso.dto.response.feed;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BurningAdviceResponseDto {
    private Long id;
    private ArticlePhotoResponseDto photo;
    private int hit;
    private boolean isSelected;
    private String subject;
    private Long commentCnt;
}
