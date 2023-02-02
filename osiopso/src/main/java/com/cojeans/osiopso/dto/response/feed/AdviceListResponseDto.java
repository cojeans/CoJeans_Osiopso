package com.cojeans.osiopso.dto.response.feed;

import com.cojeans.osiopso.dto.request.feed.ArticlePhotoDto;
import com.cojeans.osiopso.dto.request.feed.TagDto;
import lombok.Builder;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@Builder
public class ArticleListResponseDto {

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
