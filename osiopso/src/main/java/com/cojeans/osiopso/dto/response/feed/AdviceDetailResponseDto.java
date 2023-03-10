package com.cojeans.osiopso.dto.response.feed;

import com.cojeans.osiopso.dto.response.comment.CommentAdviceResponseDto;
import com.cojeans.osiopso.dto.response.comment.CommentLikeResponseDto;
import com.cojeans.osiopso.dto.response.comment.CommentResponseDto;
import lombok.Builder;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@Builder
public class AdviceDetailResponseDto {

    private Long id;
    private Long userId;
    private String userName;
    private Date createTime;
    private Date modifyTime;
    private Long commentCnt;
    private String profileImageUrl;
    private List<ArticlePhotoResponseDto> photos;
    private List<ArticleLikeResponseDto> articleLikes;
    private List<CommentAdviceResponseDto> comments;
    private int hit;
    private String content;
    private boolean isSelected;
    private String subject;
}
