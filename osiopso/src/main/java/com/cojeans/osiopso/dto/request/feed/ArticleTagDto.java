package com.cojeans.osiopso.dto.request.feed;

import com.cojeans.osiopso.entity.feed.Article;
import com.cojeans.osiopso.entity.feed.ArticlePhoto;
import com.cojeans.osiopso.entity.feed.ArticleTag;
import com.cojeans.osiopso.entity.tag.Tag;
import lombok.Builder;
import lombok.Data;

import javax.persistence.*;
@Data
@Builder
public class ArticleTagDto {

    private Article article;
    private Tag tag;

//    public ArticleTag toEntity() {
//        return ArticleTag.builder()
//                .article(article)
//                .tag(tag)
//                .build();
//    }
}
