package com.cojeans.osiopso.dto.response.comment;

import lombok.Data;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
public class CommentAdviceResponseDto {

    private Long commentId;
    private Long userId;
    private String userName;
    private String profileImageUrl;
    private String imageUrl;
    private Float pastTime;
    private Boolean like;
    private String time;
    private String content;
    private Long report;
    private Long up;
    private Long down;
    private Boolean isSelected;
}
