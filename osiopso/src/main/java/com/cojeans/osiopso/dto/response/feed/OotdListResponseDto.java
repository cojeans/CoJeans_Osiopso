package com.cojeans.osiopso.dto.response.feed;

import com.cojeans.osiopso.dto.request.feed.ArticlePhotoRequestDto;
import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class OotdListResponseDto {

    private Long id;
    private Long userId;

    // 지금 시간 - createdTime
    private Date createTime;
    private Long time;
    private ArticlePhotoResponseDto photo;
    private Long commentCnt;
    private int hit;
    private String content;
    private boolean isSelected;
    private String subject;
    private String dtype;
}
