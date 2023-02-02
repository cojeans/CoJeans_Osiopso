package com.cojeans.osiopso.dto.request.feed;

import com.cojeans.osiopso.entity.feed.Article;
import lombok.Builder;
import lombok.Data;


@Data
@Builder
public class ArticlePhotoRequestDto {

    private String originFilename;
    private String storeFilename;
    private Article article;

//    public ArticlePhoto toEntity() {
//        return ArticlePhoto.builder()
//                .originFilename(originFilename)
//                .storeFilename(storeFilename)
//                .article(article)
//                .build();
//    }
}
