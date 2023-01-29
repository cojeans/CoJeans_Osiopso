package com.cojeans.osiopso.service;

import com.cojeans.osiopso.dto.feed.ArticleDto;
import com.cojeans.osiopso.entity.feed.Article;
import com.cojeans.osiopso.entity.user.User;
import com.cojeans.osiopso.repository.ArticleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = false)
@RequiredArgsConstructor
public class ArticleService {

    private final ArticleRepository articleRepository;

    public List<ArticleDto> listFeed() {
        List<ArticleDto> feeds = articleRepository.findFeeds();

        return feeds;
    }

    public boolean writeFeed(ArticleDto articleDto) {
        // 추후에 로그인 기능이 완성된다면 어떤식으로 유저 정보(JWT) 를 받아올지?
        User user = new User();

        System.out.println("호출됨");
        Article article = articleDto.toEntity(user);
        if (articleRepository.save(articleDto.toEntity(user)) == null) {
            return false;
        } else {
            return true;
        }
    }
}
