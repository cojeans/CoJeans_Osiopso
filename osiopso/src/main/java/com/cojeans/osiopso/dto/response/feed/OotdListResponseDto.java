package com.cojeans.osiopso.dto.response.feed;

import com.cojeans.osiopso.dto.request.feed.ArticlePhotoDto;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OotdListResponseDto {

    private Long id;
    private Long userId;

    // 지금 시간 - createdTime
    private Long time;
    private ArticlePhotoDto photo;
    private int hit;
    private String content;
    private boolean isSelected;
    private String subject;
    private String dtype;
}
