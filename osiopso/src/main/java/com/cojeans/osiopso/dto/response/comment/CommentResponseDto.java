package com.cojeans.osiopso.dto.response.comment;

import lombok.Data;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@SuperBuilder
public class CommentResponseDto {

    private Long commentId;
    private String content;
    private Long userId;
    private Long report;
    private List<CocommentResponseDto> cocoments;
}
