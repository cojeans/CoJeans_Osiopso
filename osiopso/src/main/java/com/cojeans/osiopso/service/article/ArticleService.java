package com.cojeans.osiopso.service.article;

//import com.cojeans.osiopso.dto.request.feed.ArticleRequestDto;
import com.cojeans.osiopso.dto.GapTimeVo;
import com.cojeans.osiopso.entity.comment.Comment;
import com.cojeans.osiopso.entity.feed.Advice;
import com.cojeans.osiopso.entity.feed.Article;
        import com.cojeans.osiopso.entity.feed.ArticleTag;
import com.cojeans.osiopso.entity.feed.Ootd;
import com.cojeans.osiopso.repository.article.*;
import com.cojeans.osiopso.repository.comment.CommentRepository;
        import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
@Transactional(readOnly = false)
@RequiredArgsConstructor
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final ArticleTagRepository articleTagRepository;
    private final ArticlePhotoRepository articlePhotoRepository;
    private final TagRepository tagRepository;
    private final CommentRepository commentRepository;

    // 1번 article 을 지울 때..
    // 1번 article 을 외래키로 가진 article_tag 조회
    // 해당 article_tag 의 tag_id를 찾아서 tag 삭제
    // 해당 article_tag 삭제
    // 게시물 삭제
    public boolean deleteArticle(Long articleNo, Long userId) {
        Article article = articleRepository.findById(articleNo).orElseThrow();

        // 게시글 작성자만 삭제권한이 있다.
        if (userId != article.getUser().getId()) {
            return false;
        }

        // 게시물과 관련된 태그들 삭제
        List<ArticleTag> articleTag = articleTagRepository.findByArticle_Id(articleNo);
        for (ArticleTag at : articleTag) {
            articleTagRepository.deleteById(at.getId());
            tagRepository.deleteById(at.getTag().getId());
        }

        // 게시물과 관련된 사진삭제
        articlePhotoRepository.deleteByArticle_Id(articleNo);
        Long articleId = articleRepository.findById(articleNo).orElseThrow().getId();

        // 게시물과 관련된 댓글들 삭제
        commentRepository.deleteByArticle_Id(articleNo);

        // 게시물 삭제
        articleRepository.deleteById(articleId);

        // 확실히 지워진 경우 (삭제한 articleNo로 해당 게시물을 찾을 수 없어야 한다.)
        if (articleRepository.findById(articleNo).isEmpty()) {
            return true;
        } else {
            return false;
        }
    }

    public GapTimeVo getGapTime(Object object, Date date) {
        Date createTime;

        if (object instanceof Ootd) {
            createTime = ((Ootd) object).getCreateTime();
        } else if (object instanceof Advice) {
            createTime = ((Advice) object).getCreateTime();
        } else {
            createTime = ((Comment) object).getCreateTime();
        }

        long createT = createTime.getTime();
        long nowT = date.getTime();
        long timeGap = (nowT - createT) / 1000;
        float pastTime = timeGap / 1000;
        String timeGapToString = "";

        // l/1000 는 초 단위
        if (timeGap < 60) {
            timeGapToString = Long.toString(timeGap) + "s";
        } else if (timeGap < 3600) { // 60초 ~ 3600초(1분 ~ 60분) 는 분 단위
            timeGapToString = Long.toString(timeGap / 60) + "m";
        } else if (timeGap < 84000) { // 3601초 ~ 84000초 (1시간 ~ 24시간) 는 시간 단위
            timeGapToString = Long.toString(timeGap / 3600) + "h";
        } else if (timeGap < 2520000) { // 84001초 ~  (1일 ~ 30일) 는 일단위
            timeGapToString = Long.toString(timeGap / 84000) + "d";
        }

        return GapTimeVo.builder()
                .pastTime(pastTime)
                .timeGapToString(timeGapToString)
                .build();
    }
}