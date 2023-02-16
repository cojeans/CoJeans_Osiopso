package com.cojeans.osiopso.dto.response.feed;

import com.cojeans.osiopso.dto.response.comment.CocommentResponseDto;
import com.cojeans.osiopso.dto.response.comment.CommentResponseDto;
import com.cojeans.osiopso.dto.tag.ArticleTagResponseDto;
import lombok.Builder;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@Builder
public class OotdDetailResponseDto {

    private Long id;
    private Long userId;
    private String userName;
    private Date createTime;
    private Date modifyTime;
    private Long commentCnt;
    private String profileImageUrl;
    private List<ArticlePhotoResponseDto> photos;
    private List<ArticleTagResponseDto> tags;
    private List<ArticleLikeResponseDto> articleLikes;
//    private List<CommentLikeResponseDto> commentLikes;
    private List<CommentResponseDto> comments;
    private int hit;
    private String content;
}
