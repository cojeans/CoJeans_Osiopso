package com.cojeans.osiopso.dto.response.feed;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class HotIssueResponseDto {
    private Long id;
    private ArticlePhotoResponseDto photo;
    private int hit;
    private Long commentCnt;
}
