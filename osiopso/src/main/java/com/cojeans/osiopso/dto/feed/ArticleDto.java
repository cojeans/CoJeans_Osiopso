package com.cojeans.osiopso.dto.feed;

import com.cojeans.osiopso.entity.feed.*;
import com.cojeans.osiopso.entity.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@Builder
public class ArticleDto {

    private Long id;
    private List<ArticlePhoto> photos;
    private List<ArticleTag> tags;
    private Date createTime;
    private Date modifyTime;
    private int hit;
    private String dtype;
    private String content;
    private Long userId;

    // Advice
    private boolean isSelected;
    private String subject;


    public Article toEntity(User user, Long articleNo){

        // 수정하는 경우
        if (articleNo != 0) {
            switch (dtype) {
                // DTYPE = "OOTD"
                case "O":
                    return Ootd.builder()
                            .id(articleNo)
                            .dtype(dtype)
                            .user(user)
                            .photos(photos)
                            .tags(tags)
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
                            .photos(photos)
                            .tags(tags)
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
                        .photos(photos)
                        .tags(tags)
                        .hit(hit)
                        .content(content).build();

            // DTYPE = "Advice"
            case "A":
                return Advice.builder()
                        .dtype(dtype)
                        .isSelected(isSelected)
                        .subject(subject)
                        .user(user)
                        .photos(photos)
                        .tags(tags)
                        .hit(hit)
                        .content(content).build();
        }

        return null;
    }
}
