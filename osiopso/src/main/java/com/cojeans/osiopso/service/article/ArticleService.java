package com.cojeans.osiopso.service.article;

import com.cojeans.osiopso.dto.feed.ArticleDto;
import com.cojeans.osiopso.dto.feed.ArticlePhotoDto;
import com.cojeans.osiopso.dto.feed.ArticleTagDto;
import com.cojeans.osiopso.dto.feed.TagDto;
import com.cojeans.osiopso.entity.feed.Advice;
import com.cojeans.osiopso.entity.feed.Article;
import com.cojeans.osiopso.entity.feed.ArticlePhoto;
import com.cojeans.osiopso.entity.feed.ArticleTag;
import com.cojeans.osiopso.entity.tag.Tag;
import com.cojeans.osiopso.entity.user.User;
import com.cojeans.osiopso.repository.article.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = false)
@RequiredArgsConstructor
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final ArticleTagRepository articleTagRepository;
    private final TagRepository tagRepository;

    public boolean createArticle(ArticleDto articleDto) {
        // 추후에 로그인 기능이 완성된다면 어떤식으로 유저 정보(JWT) 를 받아올지?
        User token = new User();

        List<TagDto> tags = articleDto.getTags();
        Article article = articleDto.toEntity(token, 0L);

        // 1. 게시물 먼저 저장
        // 2. Dto 필드 중, 태그의 개수만큼 태그 저장
        // 3. ArticleTag 에 게시물과 유저를 넣고 저장
        articleRepository.save(article);

        for (TagDto tag : tags) {
            Tag tagE = tag.toTagEntity();
            Tag tagSaved = tagRepository.save(tagE);


            ArticleTag articleTagE = ArticleTag.builder()
                    .article(article)
                    .tag(tagSaved)
                    .build();

            articleTagRepository.save(articleTagE);
        }

//        return true;
//        if (articleRepository.save(articleDto.toEntity(token, 0L)) == null) {
//            return false;
//        } else {
//            return true;
//        }
        return true;
    }

    public boolean deleteArticle(Long articleNo) {

        // 1번 article을 지울 때..
        // 1번 article을 외래키로 가진 article_tag 조회
        // 해당 article_tag 의 tag_id를 찾아서 tag 삭제
        // 해당 article_tag 삭제
        // 게시물 삭제

        List<ArticleTag> articleTag = articleTagRepository.findByArticle_Id(articleNo);
        for (ArticleTag at : articleTag) {
            articleTagRepository.deleteById(at.getId());
            tagRepository.deleteById(at.getTag().getId());
        }

        Long articleId = articleRepository.findById(articleNo).orElseThrow().getId();
        articleRepository.deleteById(articleId);


        Optional<Article> byId = articleRepository.findById(articleNo);
        System.out.println(byId);
        // 확실히 지워진 경우 (삭제한 articleNo로 해당 게시물을 찾을 수 없어야 한다.)
        if (articleRepository.findById(articleNo).isEmpty()) {
            return true;
        } else {
            return false;
        }
    }
}
