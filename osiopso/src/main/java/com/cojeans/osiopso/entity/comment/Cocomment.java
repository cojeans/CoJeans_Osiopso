package com.cojeans.osiopso.entity.comment;

import com.cojeans.osiopso.entity.feed.Article;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Cocomment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "COMMENT_ID")
    private Comment comment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ARTICLE_ID")
    private Article article;

    private Long depth;
    // 대댓글 중, 최상위 원본 댓글 작성댓글의 pk
    private Long rootId;
    // 대댓글 중, 최상위 원본 댓글을 제외한 작성자를 멘션할 경우 그 댓글의 pk
    private Long mentionId;
    // 멘션한 유저 이름
    private String mentionName;
}
