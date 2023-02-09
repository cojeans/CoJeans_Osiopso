package com.cojeans.osiopso.dto.response.comment;

import lombok.Data;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@SuperBuilder
public class CommentResponseDto {

    private String imageUrl;
    private Float pastTime;
    private String time;
    private Long commentId;
    private String content;
    private Long userId;
    private String userName;
    private Long report;
    private List<CocommentResponseDto> cocoments;
}
