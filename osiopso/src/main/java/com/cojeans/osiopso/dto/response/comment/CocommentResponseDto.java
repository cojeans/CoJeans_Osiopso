package com.cojeans.osiopso.dto.response.comment;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CocommentResponseDto {

    private Long depth;
    private Long rootId;
    private Long mentionId;
}
