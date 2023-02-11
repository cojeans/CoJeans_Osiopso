package com.cojeans.osiopso.service.article;

import com.cojeans.osiopso.entity.feed.Article;
import com.cojeans.osiopso.entity.feed.ArticleLike;
import com.cojeans.osiopso.entity.comment.Comment;
import com.cojeans.osiopso.entity.comment.CommentLike;
import com.cojeans.osiopso.entity.user.User;
import com.cojeans.osiopso.repository.article.ArticleLikeRepository;
import com.cojeans.osiopso.repository.article.ArticleRepository;
import com.cojeans.osiopso.repository.comment.CommentLikeRepository;
import com.cojeans.osiopso.repository.comment.CommentRepository;
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

        // 만약 해당 게시물에 현재 유저가 좋아요를 누르지 않았은경우
        if (articleLikeRepository.findByUser_IdAndArticle_Id(userId, articleNo) == null) {
            Article article = articleRepository.findById(articleNo).orElseThrow();
            User user = userRepository.findById(userId).orElseThrow();

            ArticleLike articleLike = ArticleLike.builder()
                    .article(article)
                    .user(user)
                    .build();
            articleLikeRepository.save(articleLike);

        } else { // 좋아요 취소
            articleLikeRepository.deleteByUser_IdAndArticle_Id(userId, articleNo);
        }
        return true;
    }

    public boolean createCommentLike(Long commentNo, Long userId) {
        // 현재 게시물과 유저 그리고 댓글을 기준으로 좋아요를 추가한다.
        Comment comment = commentRepository.findById(commentNo).orElseThrow();
        Article article = comment.getArticle();

        // 만약 해당 게시물의 댓글에 현재 유저가 좋아요를 누르지 않았은경우
        if (commentLikeRepository.findByUser_IdAndComment_IdAndArticle_Id(userId, commentNo, article.getId()) == null){
            User user = userRepository.findById(userId).orElseThrow();

            CommentLike commentLike = CommentLike.builder()
                    .comment(comment)
                    .user(user)
                    .article(article)
                    .build();

            commentLikeRepository.save(commentLike);
        } else { // 좋아요 취소
            commentLikeRepository.deleteByUser_IdAndComment_IdAndArticle_Id(userId, commentNo, article.getId());
        }
        return true;
    }
}
