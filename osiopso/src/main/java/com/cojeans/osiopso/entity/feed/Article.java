package com.cojeans.osiopso.entity.feed;

import com.cojeans.osiopso.entity.user.User;
import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@Table(name = "articles")
@DiscriminatorColumn(name = "DTYPE")
@SuperBuilder
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //일대 다 관계로 테이블로 만들어져야함
    @OneToMany(mappedBy = "article", cascade = CascadeType.PERSIST)
    private List<ArticlePhoto> photos;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createTime;

    @Temporal(TemporalType.TIMESTAMP)
    private Date modifyTime;

    private int hit;

    private String content;

    @Column(insertable = false, updatable=false)
    private String dtype;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "USER_ID")
    private User user;

    @OneToMany(mappedBy = "article", cascade = CascadeType.PERSIST)
    private List<ArticleTag> tags;


    public Article(List<ArticlePhoto> photos, int hit, String content, String dtype, User user, List<ArticleTag> tags) {
        this.photos = photos;
        this.hit = hit;
        this.content = content;
        this.dtype = dtype;
        this.user = user;
        this.tags = tags;
    }
}
