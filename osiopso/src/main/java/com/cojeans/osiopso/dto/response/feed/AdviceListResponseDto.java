package com.cojeans.osiopso.dto.response.feed;

import com.cojeans.osiopso.dto.request.feed.ArticlePhotoRequestDto;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AdviceListResponseDto {

    private Long id;
    private Long userId;

    // 지금 시간 - createdTime
    private Long time;
    private ArticlePhotoResponseDto photo;
    private int hit;
    private String content;
    private boolean isSelected;
    private String subject;
    private Long commentCnt;
}
