package com.cojeans.osiopso.dto.request.feed;

import com.cojeans.osiopso.dto.tag.TagDto;
import com.cojeans.osiopso.entity.feed.Advice;
import com.cojeans.osiopso.entity.feed.Article;
import com.cojeans.osiopso.entity.feed.Ootd;
import com.cojeans.osiopso.entity.user.User;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Builder
@Getter
public class ArticleRequestDto {

    private Date createTime;
    private Date modifyTime;
    private String dtype;
    private List<ArticlePhotoRequestDto> photos;
    private List<TagDto> tags;
    private int hit;
    private String content;
    private boolean isSelected;
    private String subject;


    public Article toEntity(User user, Long articleNo) {
        // 수정하는 경우
        if (articleNo != 0) {
            System.out.println(dtype);
            switch (dtype) {
                // DTYPE = "OOTD"
                case "O":
                    return Ootd.builder()
                            .id(articleNo)
                            .dtype(dtype)
                            .user(user)
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
                        .hit(hit)
                        .content(content).build();

            // DTYPE = "Advice"
            case "A":
                return Advice.builder()
                        .dtype(dtype)
                        .isSelected(isSelected)
                        .subject(subject)
                        .user(user)
                        .hit(hit)
                        .content(content).build();
        }

        return null;
    }
}

