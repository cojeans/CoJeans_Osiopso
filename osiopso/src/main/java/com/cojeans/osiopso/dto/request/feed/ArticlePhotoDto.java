package com.cojeans.osiopso.dto.request.feed;

import com.cojeans.osiopso.entity.feed.Article;
import com.cojeans.osiopso.entity.feed.ArticlePhoto;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ArticlePhotoDto {

    private String originFilename;
    private String storeFilename;
    private Article article;

    public ArticlePhoto toEntity() {
        return ArticlePhoto.builder()
                .originFilename(originFilename)
                .storeFilename(storeFilename)
                .article(article)
                .build();
    }
}
