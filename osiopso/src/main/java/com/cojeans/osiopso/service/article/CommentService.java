package com.cojeans.osiopso.service.article;

import com.cojeans.osiopso.dto.request.comment.CommentRequestDto;
import com.cojeans.osiopso.dto.response.comment.CocommentResponseDto;
import com.cojeans.osiopso.dto.response.comment.CommentResponseDto;
import com.cojeans.osiopso.entity.comment.Cocomment;
import com.cojeans.osiopso.entity.comment.CommentLike;
import com.cojeans.osiopso.entity.feed.Article;
import com.cojeans.osiopso.entity.comment.Comment;
import com.cojeans.osiopso.entity.user.User;
import com.cojeans.osiopso.repository.article.ArticleRepository;
import com.cojeans.osiopso.repository.comment.CocommentRepository;
import com.cojeans.osiopso.repository.comment.CocommentRepositoryImpl;
import com.cojeans.osiopso.repository.comment.CommentLikeRepository;
import com.cojeans.osiopso.repository.comment.CommentRepository;
import com.cojeans.osiopso.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = false)
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final CocommentRepository cocommentRepository;
    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;
    private final CocommentRepositoryImpl cocommentRepositoryImpl;
    private final CommentLikeRepository commentLikeRepository;

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
            System.out.println("commentNo: " + commentNo);
            Comment savedComment = commentRepository.save(Comment.builder()
                    .user(user)
                    .content(dto.getContent())
                    .article(article)
                    .report(0L)
                    .build());

            cocommentRepository.save(Cocomment.builder()
                    .comment(savedComment)
                    .article(article)
                    .depth(1L)
                    .rootId(commentNo)
                    .mentionId(commentNo)
                    .mentionName(comment.getUser().getName())
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
                    .article(article)
                    .depth(1L)
                    .rootId(cocomment.getRootId()) // 대댓글에 대한 rootId를 rootId로..
                    .mentionId(commentNo)
                    .mentionName(comment.getUser().getName())
                    .build());
        }
        return true;
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
                .createTime(comment.getCreateTime())
                .user(comment.getUser())
                .report(comment.getReport())
                .build());

        return true;
    }

    public boolean deleteComment(Long articleno, Long commentno, Long userId) {
//        Article article = articleRepository.findById(userId).orElseThrow();
        Comment comment = commentRepository.findById(commentno).orElseThrow();

        // 댓글 작성자만 삭제권한이 있다.
        if (userId != comment.getUser().getId()) {
            return false;
        }

        // 최상위 rootComment 일 경우..
        if (cocommentRepository.findByComment_Id(commentno) == null) {

            List<Cocomment> rootIdList = cocommentRepository.findAllByRootId(commentno);

            // 1. 삭제하려는 댓글의 대댓글 모두 삭제
            cocommentRepository.deleteAllByRootId(commentno);

            // 2. 삭제하려는 댓글의 좋아요 모두 삭제
            commentLikeRepository.deleteByComment_IdAndArticle_Id(commentno, articleno);

            // 3. 댓글 삭제
            for (Cocomment cocomment : rootIdList) {
                // 2. 삭제하려는 댓글의 대댓글의 좋아요 모두 삭제
                commentLikeRepository.deleteByComment_IdAndArticle_Id(cocomment.getComment().getId(), articleno);
                commentRepository.deleteById(cocomment.getComment().getId());
            }
            commentRepository.deleteById(commentno);

        } else { // 대댓글인 경우
            // 1. 삭제하려는 댓글의 대댓글 삭제
            cocommentRepository.deleteByComment_Id(commentno);

            // 2. 삭제하려는 댓글의 좋아요 모두 삭제
            commentLikeRepository.deleteByComment_IdAndArticle_Id(commentno, articleno);

            // 3. 댓글 삭제
            commentRepository.deleteById(commentno);
        }


//            // 삭제하려는 댓글의 좋아요(commentLikes) 먼제 삭제
//            // 최상위 commnet의 Pk를 root_id로 사용하는 모든 댓글들을 삭제한다.
//            commentLikeRepository.deleteByComment_IdAndArticle_Id(commentno, articleno);
//            cocommentRepository.deleteAllByRootId(commentno);
//        } // 원석게이게이야

        // 제대로 지워졌다면?
//        if (commentRepository.findByIdAndArticle_Id(articleno, commentno) == null) {
//            return true;
//        } else {
//            return false;
//        }
        return true;
    }


    public List<CommentResponseDto> loadMoreComment(Long rootId, Long cnt) {
        Long size = Long.valueOf(cocommentRepository.findAllByRootId(rootId).size());

        System.out.println(size);

        Long start = 4 + (10 * (cnt - 1));
        Long end = 4 + (10 * cnt);

        // 만약 end 가 태그들의 개수보다 크다면..?
        if (size < end) {
            end = size;
        }

        System.out.println(start + ", " + end + ", " + rootId);

        // 대댓글 중, rootId가 일치하는 row들 start - end 까지 가져온다.
        List<Cocomment> cocommentList = cocommentRepositoryImpl.findByRootId(rootId, start, end);

        System.out.println(cocommentList.size());

        List<CommentResponseDto> cocommentResponseDtoList = new ArrayList<>();

        for (Cocomment cocomment : cocommentList) {

            // 대댓글 commentId 통해 댓글을 가져온다.
            Comment comment = commentRepository.findById(cocomment.getComment().getId()).orElseThrow();

            System.out.println(comment.getId());

            // 대댓글 DTO 생성
            cocommentResponseDtoList.add(CocommentResponseDto.builder()
                    .commentId(comment.getId())
                    .content(comment.getContent())
                    .userId(comment.getUser().getId())
                    .report(comment.getReport())
                    .depth(cocomment.getDepth())
                    .rootId(cocomment.getRootId())
                    .mentionId(cocomment.getMentionId())
                    .build());
        }

        System.out.println(cocommentResponseDtoList.size());

        return cocommentResponseDtoList;
    }

    public CommentResponseDto getComment(Long commentNo) {
        Comment comment = commentRepository.getById(commentNo);
        boolean likeCo;

        if (commentLikeRepository.findByComment_Id(comment.getId()) == null) {
            likeCo = false;
        } else {
            likeCo = true;
        }

        return CommentResponseDto.builder()
                .commentId(comment.getId())
                .like(likeCo)
                .build();
    }

    public void reportComment(Long commentNo) {
        Comment comment = commentRepository.findById(commentNo).orElseThrow();

        commentRepository.save(comment.builder()
                .id(commentNo)
                .content(comment.getContent())
                .user(comment.getUser())
                .report(comment.getReport() + 1)
                .createTime(comment.getCreateTime())
                .modifyTime(comment.getModifyTime())
                .article(comment.getArticle())
                .build());
    }
}