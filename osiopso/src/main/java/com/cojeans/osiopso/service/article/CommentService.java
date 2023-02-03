package com.cojeans.osiopso.service.article;

import com.cojeans.osiopso.dto.request.comment.CommentRequestDto;
import com.cojeans.osiopso.entity.user.User;
import com.cojeans.osiopso.repository.article.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = false)
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final ArticleRepository articleRepository;

    public boolean createComment(CommentRequestDto dto, Long articleno) {
        // 추후에 로그인 기능이 완성된다면 어떤식으로 유저 정보(JWT) 를 받아올지?
        User token = new User();

        Article article = articleRepository.findById(articleno).orElseThrow();

        System.out.println(article);

        Comment build = Comment.builder()
                .user(token)
                .content(dto.getContent())
                .article(article)
                .build();

        System.out.println(build);

        commentRepository.save(build);

        return true;
    }

    public void editComment(Long articleno, Long commentno, CommentRequestDto dto) {
        Article article = articleRepository.findById(articleno).orElseThrow();
        Comment comment = commentRepository.findByIdAndArticle_Id(commentno, articleno);

        commentRepository.save(comment.builder()
                .id(comment.getId())
                .content(dto.getContent())
                .article(article)
                .user(comment.getUser())
                .build());
    }

    public boolean deleteComment(Long commentno, Long articleno) {
        commentRepository.deleteByIdAndArticle_Id(commentno, articleno);

        // 제대로 지워졌다면?
        if (commentRepository.findByIdAndArticle_Id(articleno, commentno) == null) {
            return true;
        } else {
            return false;
        }
    }
}
