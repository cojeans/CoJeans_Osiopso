package com.cojeans.osiopso.dto.response.feed;

import com.cojeans.osiopso.dto.request.feed.ArticlePhotoDto;
import com.cojeans.osiopso.dto.tag.TagDto;
import lombok.Builder;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@Builder
public class ArticleResponseDto {

    private Long id;
    private Long userId;
    private Date createTime;
    private Date modifyTime;
    private List<ArticlePhotoDto> photos;
    private List<TagDto> tags;
    private int hit;
    private String content;
    private boolean isSelected;
    private String subject;
    private String dtype;
}
