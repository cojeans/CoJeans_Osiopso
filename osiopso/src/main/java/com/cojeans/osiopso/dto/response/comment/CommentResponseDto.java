package com.cojeans.osiopso.dto.response.comment;

import lombok.Data;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@SuperBuilder
public class CommentResponseDto {

    private Long commentId;
    private Long userId;
    private String userName;
    private String imageUrl;
    private Float pastTime;
    private boolean like;
    private String time;
    private String content;
    private Long cocommentCnt;
    private String profileImageUrl;
    private Long report;
    private List<CommentLikeResponseDto> commentLikes;
    private List<CocommentResponseDto> cocoments;
}
