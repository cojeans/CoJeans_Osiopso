package com.cojeans.osiopso.service.article;

import com.cojeans.osiopso.dto.request.comment.CommentRequestDto;
import com.cojeans.osiopso.entity.comment.Cocomment;
import com.cojeans.osiopso.entity.feed.Article;
import com.cojeans.osiopso.entity.comment.Comment;
import com.cojeans.osiopso.entity.user.User;
import com.cojeans.osiopso.repository.article.ArticleRepository;
import com.cojeans.osiopso.repository.comment.CocommentRepository;
import com.cojeans.osiopso.repository.comment.CommentRepository;
import com.cojeans.osiopso.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = false)
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final CocommentRepository cocommentRepository;
    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;

    public boolean createComment(CommentRequestDto dto, Long articleNo, Long id) {
        User user = userRepository.findById(id).orElseThrow();
        Article article = articleRepository.findById(articleNo).orElseThrow();

        // 일반 댓글은 depth 가 0이며, rootId와 mentionId가 null 이다.
        Comment build = Comment.builder()
                .user(user)
                .content(dto.getContent())
                .article(article)
                .report(0L)
                .build();

        commentRepository.save(build);
        return true;
    }


    public boolean createCocomment(CommentRequestDto dto, Long articleNo, Long commentNo, Long id) {
        User user = userRepository.findById(id).orElseThrow();
        Article article = articleRepository.findById(articleNo).orElseThrow();

        // commentNo번 댓글에 대한 대댓글을 달겠다!
        // 내가 멘션한 사람이  rootComment 인지 알아야한다.

        // 대댓글을 작성하려는 commentNo 가 있는지 먼저 확인한다!
        Comment comment = commentRepository.findById(commentNo).orElseThrow();
        Cocomment cocomment = cocommentRepository.findByComment_Id(commentNo);

        // 대댓글을 달려는 댓글 번호가 comment DB에 등록되어 있지 않다면, 대댓글을 달 수 없다.
        if (comment == null) {
            return false;
        }

        // 대댓글을 달려는 댓글 번호가 cocomment DB에 등록되어 있지 않다면, 그 댓글은 rootComment 이다.
        if (cocomment == null) {
            Comment savedComment = commentRepository.save(Comment.builder()
                    .user(user)
                    .content(dto.getContent())
                    .article(article)
                    .report(0L)
                    .build());

            cocommentRepository.save(Cocomment.builder()
                    .comment(savedComment)
                    .depth(1L)
                    .rootId(commentNo)
                    .mentionId(commentNo)
                    .build());
            
        } else { // 댓글을 달려는 댓글 번호가 cocoment DB에 등록되어 있다면, 그 댓글은 CoComment 이다.
            Comment savedComment = commentRepository.save(Comment.builder()
                    .user(user)
                    .content(dto.getContent())
                    .article(article)
                    .report(0L)
                    .build());

            cocommentRepository.save(Cocomment.builder()
                    .comment(savedComment)
                    .depth(1L)
                    .rootId(cocomment.getRootId()) // 대댓글에 대한 rootId를 rootId로..
                    .mentionId(commentNo)
                    .build());
        }
        return true;
//        // 만약 rootComment 라면?
//        if (comment.getDepth() == 0L) {
//            commentRepository.save(Comment.builder()
//                    .user(user)
//                    .content(dto.getContent())
//                    .article(article)
//                    .depth(1L)
//                    .report(0L)
//                    .rootId(commentNo)
//                    .mentionId(commentNo)
//                    .build());
//        } else { // 대댓글에 다는 대대댓글일 경우..
//            commentRepository.save(Comment.builder()
//                    .user(user)
//                    .content(dto.getContent())
//                    .article(article)
//                    .depth(1L)
//                    .report(0L)
//                    .rootId(comment.getRootId()) // 대댓글에 대한 rootId를 rootId로..
//                    .mentionId(commentNo)
//                    .build());
//        }
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
        if (cocommentRepository.findByComment_Id(comment.getId()) == null) {
            // 최상위 commnet의 Pk를 root_id로 사용하는 모든 게시물을 삭제한다.
            cocommentRepository.deleteAllByRootId(commentno);
        } // 원석게이야


        // 제대로 지워졌다면?
        if (commentRepository.findByIdAndArticle_Id(articleno, commentno) == null) {
            return true;
        } else {
            return false;
        }
    }


    public void loadMoreComment(Long rootId, Long cnt) {
        Long start = 3 * (10 * cnt - 1);
        Long end = 3 + (10 * cnt);

//        List<Cocomment> cocommentList = cocommentRepository.findByRootId(rootId, start, end);

//        int cnt = 0;
        // 3 -> 13 -> 23

        // 만약 추가로 불러올 대댓글의 개수가 대댓글의 수 보다 많은경우에는..
//        if (13 + (cnt * 10) > cocommentList.size()) {
//            for (int i = 3 + (cnt * 10); i < cocommentList.size(); i++) {
//                cocommentList.get(i);
//            }
//        }
//
//        for (int i = 3 + (cnt * 10); i < 13 + (cnt * 10); i++) {
//            cocommentList.get(i);
//        }
    }
}