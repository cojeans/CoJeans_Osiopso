package com.cojeans.osiopso.dto.request.feed;

import lombok.Builder;
import lombok.Data;


@Data
@Builder
public class ArticlePhotoRequestDto {

    private String imageUrl;
}
