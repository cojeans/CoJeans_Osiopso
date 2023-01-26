package com.cojeans.osiopso.api.entity.feed;

import com.cojeans.osiopso.api.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDate;


/*
반대쪽(Article)에도 연관관계 매핑 필요함 아직미완성
*/
@Entity
@Getter @Builder @NoArgsConstructor @AllArgsConstructor
public class LikeArticle {
    @Id @GeneratedValue
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ARTICLE_ID", nullable = false)
    private Article article;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @Column(nullable = false)
    private boolean status; // true = 좋아요, false = 좋아요 취소


    private LocalDate createTime; // 날짜

    @PrePersist // DB에 INSERT 되기 직전에 실행. 즉 DB에 값을 넣으면 자동으로 실행됨
    public void createDate() {
        this.createTime = LocalDate.now();
    }

    public LikeArticle(Article article, User user) {
        this.article = article;
        this.user = user;
        this.status = true;
    }

//    public void unLikeBoard(Article article) {
//        this.status = false;
//        article.setLiked(article.getLiked() - 1);
//    }

}
