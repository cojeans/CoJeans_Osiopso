package com.cojeans.osiopso.service;

import com.cojeans.osiopso.dto.feed.ArticleDto;
import com.cojeans.osiopso.entity.feed.Advice;
import com.cojeans.osiopso.entity.feed.Article;
import com.cojeans.osiopso.entity.user.User;
import com.cojeans.osiopso.repository.AdviceRepository;
import com.cojeans.osiopso.repository.ArticleRepository;
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
    private final AdviceRepository adviceRepository;

    public List<ArticleDto> listFeed() {
        List<Article> feeds = articleRepository.findFeeds();
        List<ArticleDto> articleDtos = new ArrayList<>();

        for (Article article : feeds) {
            ArticleDto dto = ArticleDto.builder()
                    .id(article.getId())
                    .photos(article.getPhotos())
                    .hit(article.getHit())
                    .content(article.getContent())
                    .createTime(article.getCreateTime())
                    .dtype(article.getDtype())
                    .modifyTime(article.getModifyTime())
                    .tags(article.getTags())
                    .userId(article.getUser().getId())
                    .build();

            articleDtos.add(dto);
        }

        for (ArticleDto articleDto : articleDtos) {
            System.out.println(articleDto.toString());
        }

        return articleDtos;
    }

    public boolean createFeed(ArticleDto articleDto) {
        // 추후에 로그인 기능이 완성된다면 어떤식으로 유저 정보(JWT) 를 받아올지?
        User user = new User();

        System.out.println("호출됨");
        System.out.println(articleDto);
        if (articleRepository.save(articleDto.toEntity(user)) == null) {
            return false;
        } else {
            return true;
        }
    }

    public ArticleDto detailFeed(Long feedNo) {
        Advice advice = adviceRepository.findById(feedNo).orElseThrow();

        return ArticleDto.builder()
                .id(advice.getId())
                .photos(advice.getPhotos())
                .hit(advice.getHit())
                .content(advice.getContent())
                .createTime(advice.getCreateTime())
                .dtype(advice.getDtype())
                .modifyTime(advice.getModifyTime())
                .tags(advice.getTags())
                .userId(advice.getUser().getId())
                .isSelected(advice.isSelected())
                .subject(advice.getSubject())
                .build();
    }
}
