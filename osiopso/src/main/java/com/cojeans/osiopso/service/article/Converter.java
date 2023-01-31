package com.cojeans.osiopso.service.article;

import com.cojeans.osiopso.dto.feed.ArticlePhotoDto;
import com.cojeans.osiopso.dto.feed.ArticleTagDto;
import com.cojeans.osiopso.entity.feed.ArticlePhoto;
import com.cojeans.osiopso.entity.feed.ArticleTag;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class Converter {

    public List<ArticlePhotoDto> toPhotoDto(List<ArticlePhoto> photos) {
        List<ArticlePhotoDto> list = new ArrayList<>();

        for (ArticlePhoto photo : photos) {
            list.add(ArticlePhotoDto.builder()
                    .id(photo.getId())
                    .originFilename(photo.getOriginFilename())
                    .storeFilename(photo.getStoreFilename())
                    .article(photo.getArticle())
                    .build());
        }

        return list;
    }


    public List<ArticleTagDto> toTagDto(List<ArticleTag> tags) {
        List<ArticleTagDto> list = new ArrayList<>();

        for (ArticleTag tag : tags) {
            list.add(ArticleTagDto.builder()
                    .id(tag.getId())
                    .tag(tag.getTag())
                    .article(tag.getArticle())
                    .build());
        }

        return list;
    }
}
