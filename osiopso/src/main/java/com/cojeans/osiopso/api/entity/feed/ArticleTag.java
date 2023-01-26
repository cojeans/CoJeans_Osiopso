package com.cojeans.osiopso.api.entity.feed;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter @Builder @AllArgsConstructor @NoArgsConstructor
public class ArticleTag {
    @Id @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ARTICLE_ID")
    private Article article;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "TAG_ID")
    private Tag tag;

}
