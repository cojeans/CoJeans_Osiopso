package com.cojeans.osiopso.dto.response.feed;

import com.cojeans.osiopso.dto.request.feed.ArticlePhotoRequestDto;
import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class OotdListResponseDto {

    private Long id;
    private Float pastTime;
    private String time;
    private Long userId;
    private String imageUrl;
    private Long commentCnt;
    private int hit;
    private String content;
}
