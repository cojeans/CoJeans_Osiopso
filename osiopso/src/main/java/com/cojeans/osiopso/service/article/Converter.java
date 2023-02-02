package com.cojeans.osiopso.service.article;

import com.cojeans.osiopso.dto.request.feed.ArticlePhotoRequestDto;
import com.cojeans.osiopso.entity.feed.ArticlePhoto;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class Converter {

    public List<ArticlePhotoRequestDto> toPhotoDto(List<ArticlePhoto> photos) {
        List<ArticlePhotoRequestDto> list = new ArrayList<>();

        for (ArticlePhoto photo : photos) {
            list.add(ArticlePhotoRequestDto.builder()
//                    .id(photo.getId())
                    .originFilename(photo.getOriginFilename())
                    .storeFilename(photo.getStoreFilename())
                    .article(photo.getArticle())
                    .build());
        }

        return list;
    }
}
