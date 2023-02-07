package com.cojeans.osiopso.dto.response.comment;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class CommentResponseDto {

    private Long commentId;
    private String content;
    private Long userId;
    private Long report;
    private List<CocommentResponseDto> cocoments;
}
