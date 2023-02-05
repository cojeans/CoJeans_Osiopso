package com.cojeans.osiopso.dto.response.feed;

import com.cojeans.osiopso.dto.tag.ArticleTagResponseDto;
import com.cojeans.osiopso.entity.feed.CommentLike;
import lombok.Builder;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@Builder
public class ArticleDetailResponseDto {

    private Long id;
    private Long userId;
    private Date createTime;
    private Date modifyTime;
    private List<ArticlePhotoResponseDto> photos;
    private List<ArticleTagResponseDto> tags;
    private List<ArticleLikeResponseDto> articleLikes;
    private List<CommentLikeResponseDto> commentLikes;
    private int hit;
    private String content;
    private boolean isSelected;
    private String subject;
    private String dtype;
}

