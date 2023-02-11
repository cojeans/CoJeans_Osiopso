package com.cojeans.osiopso.dto.response.comment;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CommentLikeResponseDto {
    private final Long id;
    private final Long userId;
    private final Long commentId;
    private final String userName;
}
