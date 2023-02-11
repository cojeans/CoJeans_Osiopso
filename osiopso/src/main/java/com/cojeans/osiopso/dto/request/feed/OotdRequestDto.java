package com.cojeans.osiopso.dto.request.feed;

import lombok.*;

import java.util.Date;
import java.util.List;

@Data
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class OotdRequestDto {

    private List<ArticleTagRequestDto> tags;
    private String content;
    private List<ArticlePhotoRequestDto> urls;
}
