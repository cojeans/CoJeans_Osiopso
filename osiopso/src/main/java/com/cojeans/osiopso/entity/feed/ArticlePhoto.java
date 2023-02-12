package com.cojeans.osiopso.entity.feed;

import lombok.*;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class ArticlePhoto {
    @Id
    @GeneratedValue
    private Long id;

    @Column(columnDefinition = "MEDIUMBLOB")
    private String imageUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ARTICLE_ID")
    private Article article;

}
