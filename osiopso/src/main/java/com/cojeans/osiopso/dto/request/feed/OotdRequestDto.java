package com.cojeans.osiopso.dto.request.feed;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import java.util.List;

@Data
@Builder
@Getter
public class OotdRequestDto {

    private List<ArticlePhotoRequestDto> photos;
    private List<ArticleTagRequestDto> tags;
    private String content;
}
