package com.cojeans.osiopso.dto.response.feed;

import com.cojeans.osiopso.entity.feed.Article;
import lombok.Builder;
import lombok.Data;


@Data
@Builder
public class ArticlePhotoResponseDto {
    private String originFilename;
    private String storeFilename;

}
