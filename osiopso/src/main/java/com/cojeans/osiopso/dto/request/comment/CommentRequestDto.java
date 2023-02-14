package com.cojeans.osiopso.dto.request.comment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommentRequestDto {
    String content;
    String imageUrl;
    boolean anonymous;
    List<Long> clothesList;
}
