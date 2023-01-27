package com.cojeans.osiopso.dto.feed;

import com.cojeans.osiopso.entity.feed.ArticlePhoto;
import com.cojeans.osiopso.entity.feed.ArticleTag;
import com.cojeans.osiopso.entity.user.User;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class ArticleDto {

    private Long id;
    private List<ArticlePhoto> photos;
    private List<ArticleTag> articleTags;
    private Date createTime;
    private Date modifyTime;
    private int hit;
    private String content;
    private User user;

}
