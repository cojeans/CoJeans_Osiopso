package com.cojeans.osiopso.dto.feed;

import com.cojeans.osiopso.entity.feed.*;
import com.cojeans.osiopso.entity.tag.Tag;
import com.cojeans.osiopso.entity.user.User;
import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Builder
public class ArticleDto {

    private String dtype;
    private List<ArticlePhotoDto> photos;
    private List<ArticleTagDto> tags;
    private int hit;
    private String content;
    private boolean isSelected;
    private String subject;


    public Article toEntity(User user, Long articleNo) {
        // 수정하는 경우
        if (articleNo != 0) {
            switch (dtype) {
                // DTYPE = "OOTD"
                case "O":
                    return Ootd.builder()
                            .id(articleNo)
                            .dtype(dtype)
                            .user(user)
                            .photos(toPhotoEntity(photos))
//                            .tags(toTagEntity(tags))
                            .hit(hit)
                            .content(content).build();

                // DTYPE = "Advice"
                case "A":
                    return Advice.builder()
                            .id(articleNo)
                            .dtype(dtype)
                            .isSelected(isSelected)
                            .subject(subject)
                            .user(user)
                            .photos(toPhotoEntity(photos))
//                            .tags(toTagEntity(tags))
                            .hit(hit)
                            .content(content).build();
            }
        }

        switch (dtype) {
            // DTYPE = "OOTD"
            case "O":
                return Ootd.builder()
                        .dtype(dtype)
                        .user(user)
                        .photos(toPhotoEntity(photos))
//                        .tags(toTagEntity(tags))
                        .hit(hit)
                        .content(content).build();

            // DTYPE = "Advice"
            case "A":
                return Advice.builder()
                        .dtype(dtype)
                        .isSelected(isSelected)
                        .subject(subject)
                        .user(user)
                        .photos(toPhotoEntity(photos))
//                        .tags(toTagEntity(tags))
                        .hit(hit)
                        .content(content).build();
        }

        return null;
    }

    private List<ArticlePhoto> toPhotoEntity(List<ArticlePhotoDto> photos) {
        List<ArticlePhoto> list = new ArrayList<>();

        for (ArticlePhotoDto photo : photos) {
            list.add(photo.toEntity());
        }

        return list;
    }

    public ArticleTag toArticleTag() {

    }


    public Tag toTagEntity() {

    }


//    private List<ArticleTag> toTagEntity(List<ArticleTagDto> tags) {
//        List<ArticleTag> list = new ArrayList<>();
//
//        for (ArticleTagDto tag : tags) {
//            list.add(tag.toEntity());
//        }
//
//        return list;
//    }
}
