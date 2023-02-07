package com.cojeans.osiopso.service.article;

import com.cojeans.osiopso.dto.request.comment.CommentRequestDto;
import com.cojeans.osiopso.entity.feed.Article;
import com.cojeans.osiopso.entity.comment.Comment;
import com.cojeans.osiopso.entity.user.User;
import com.cojeans.osiopso.repository.article.ArticleRepository;
import com.cojeans.osiopso.repository.article.CommentRepository;
import com.cojeans.osiopso.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = false)
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;

    public boolean createComment(CommentRequestDto dto, Long articleNo, Long id) {
        User user = userRepository.findById(id).orElseThrow();
        Article article = articleRepository.findById(articleNo).orElseThrow();

        // 일반 댓글은 depth 가 0이며, rootId와 mentionId가 null이다.
        Comment build = Comment.builder()
                .user(user)
                .content(dto.getContent())
                .article(article)
                .depth(0L)
                .report(0L)
                .build();

        commentRepository.save(build);
        return true;
    }


    public void createCocomment(CommentRequestDto dto, Long articleNo, Long commentNo, Long id) {
        User user = userRepository.findById(id).orElseThrow();
        Article article = articleRepository.findById(articleNo).orElseThrow();

        // commentNo번 댓글에 대한 대댓글을 달겠다!
        // 내가 멘션한 사람이  rootComment 인지 알아야한다.
        Comment comment = commentRepository.findById(commentNo).orElseThrow();

        // 만약 rootComment 라면?
        if (comment.getDepth() == 0L) {
            commentRepository.save(Comment.builder()
                    .user(user)
                    .content(dto.getContent())
                    .article(article)
                    .depth(1L)
                    .report(0L)
                    .rootId(commentNo)
                    .mentionId(commentNo)
                    .build());
        } else { // 대댓글에 다는 대대댓글일 경우..
            commentRepository.save(Comment.builder()
                    .user(user)
                    .content(dto.getContent())
                    .article(article)
                    .depth(1L)
                    .report(0L)
                    .rootId(comment.getRootId()) // 대댓글에 대한 rootId를 rootId로..
                    .mentionId(commentNo)
                    .build());
        }
    }



    public boolean editComment(Long articleno, Long commentno, CommentRequestDto dto, Long userId) {
        Article article = articleRepository.findById(articleno).orElseThrow();

        // 게시글 작성자만 수정권한이 있다.
        if (userId != article.getUser().getId()) {
            return false;
        }

        Comment comment = commentRepository.findByIdAndArticle_Id(commentno, articleno);

        commentRepository.save(comment.builder()
                .id(comment.getId())
                .content(dto.getContent())
                .article(article)
                .user(comment.getUser())
                .mentionId(comment.getMentionId())
                .rootId(comment.getRootId())
                .depth(comment.getDepth())
                .report(comment.getReport())
                .build());

        return true;
    }

    public boolean deleteComment(Long commentno, Long articleno, Long userId) {
        Article article = articleRepository.findById(userId).orElseThrow();
        Comment comment = commentRepository.findById(commentno).orElseThrow();

        // 게시글 작성자만 삭제권한이 있다.
        if (userId != article.getUser().getId()) {
            return false;
        }

        // 삭제하려는 comment의 번호와 article의 번호가 일치하는 comment를 삭제한다.
        commentRepository.deleteByIdAndArticle_Id(commentno, articleno);

        // 최상위 rootComment 일 경우..
        if (comment.getRootId() == null) {
            // 최상위 commnet의 Pk를 root_id로 사용하는 모든 게시물을 삭제한다.
            commentRepository.deleteAllByRootId(commentno);
        }


        // 제대로 지워졌다면?
        if (commentRepository.findByIdAndArticle_Id(articleno, commentno) == null) {
            return true;
        } else {
            return false;
        }
    }


}
