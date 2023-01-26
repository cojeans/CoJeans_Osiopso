package com.cojeans.osiopso.api.entity.feed;

import com.cojeans.osiopso.api.entity.User;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter @Setter
@AllArgsConstructor @NoArgsConstructor @Builder
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "DTYPE")
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //일대 다 관계로 테이블로 만들어져야함
    @OneToMany(mappedBy = "article")
    private List<Photo> photos;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createTime;

    @Temporal(TemporalType.TIMESTAMP)
    private Date modifyTime;

    private int hit;

    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    @OneToMany(mappedBy = "article")
    private List<ArticleTag> articleTags;







    
}
