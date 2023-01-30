package com.cojeans.osiopso.entity.feed;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class ArticlePhoto {
    @Id
    @GeneratedValue
    private Long id;
    @Column(name = "origin_filename")
    private String originFilename;
    @Column(name = "store_filename")
    private String storeFilename;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ARTICLE_ID")
    private Article article;
}
