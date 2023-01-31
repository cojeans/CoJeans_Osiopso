package com.cojeans.osiopso.dto.feed;

import com.cojeans.osiopso.entity.feed.Article;
import com.cojeans.osiopso.entity.feed.ArticlePhoto;
import com.cojeans.osiopso.entity.feed.ArticleTag;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Builder
public class ArticlePhotoDto {

    private Long id;
    private String originFilename;
    private String storeFilename;
    private Article article;

    public ArticlePhoto toEntity() {
        return ArticlePhoto.builder()
                .id(id)
                .originFilename(originFilename)
                .storeFilename(storeFilename)
                .article(article)
                .build();
    }
}
