package com.cojeans.osiopso.dto.response.comment;

import lombok.Data;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@SuperBuilder
public class CocommentResponseDto extends CommentResponseDto {

    private Long depth;
    private Long rootId;
    private Long mentionId;
    private String mentionName;
}
