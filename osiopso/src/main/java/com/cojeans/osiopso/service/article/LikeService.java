package com.cojeans.osiopso.service.article;

import com.cojeans.osiopso.entity.feed.Article;
import com.cojeans.osiopso.entity.feed.ArticleLike;
import com.cojeans.osiopso.entity.feed.Comment;
import com.cojeans.osiopso.entity.feed.CommentLike;
import com.cojeans.osiopso.entity.user.User;
import com.cojeans.osiopso.repository.article.ArticleLikeRepository;
import com.cojeans.osiopso.repository.article.ArticleRepository;
import com.cojeans.osiopso.repository.article.CommentLikeRepository;
import com.cojeans.osiopso.repository.article.CommentRepository;
import com.cojeans.osiopso.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = false)
@RequiredArgsConstructor
public class LikeService {

    private final UserRepository userRepository;
    private final ArticleRepository articleRepository;
    private final ArticleLikeRepository articleLikeRepository;
    private final CommentRepository commentRepository;
    private final CommentLikeRepository commentLikeRepository;

    public boolean createArticleLike(Long articleNo, Long userId) {
        // 현재 게시물과 유저를 기준으로 게시물 좋아요를 추가한다.
        // 추가로 구현해야할 로직: 좋아요를 한 번 더 눌렀을 경우에 (같은 유저가 이미 눌렀던 게시물을 좋아요 누른경우)
        // findById를 통해 이미 해당 유저가 좋아요를 눌렀다면 좋아요를 삭제시킨다.

        Article article = articleRepository.findById(articleNo).orElseThrow();
        User user = userRepository.findById(userId).orElseThrow();

        ArticleLike articleLike = ArticleLike.builder()
                .article(article)
                .user(user)
                .build();

        articleLikeRepository.save(articleLike);

        return true;
    }

    public boolean createCommentLike(Long commentNo, Long userId) {
        // 현재 게시물과 유저 그리고 댓글을 기준으로 좋아요를 추가한다.
        // 추가로 구현해야할 로직: 좋아요를 한 번 더 눌렀을 경우에 (같은 유저가 이미 눌렀던 댓글 좋아요 누른경우)
        // findById를 통해 이미 해당 유저가 좋아요를 눌렀다면 좋아요를 삭제시킨다.

        User user = userRepository.findById(userId).orElseThrow();
        Comment comment = commentRepository.findById(commentNo).orElseThrow();
        Article article = comment.getArticle();

        CommentLike commentLike = CommentLike.builder()
                .comment(comment)
                .user(user)
                .article(article)
                .build();

        commentLikeRepository.save(commentLike);

        return true;
    }
}
