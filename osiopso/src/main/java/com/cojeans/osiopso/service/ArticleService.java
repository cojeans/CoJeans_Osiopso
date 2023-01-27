package com.cojeans.osiopso.service;

import com.cojeans.osiopso.dto.feed.ArticleDto;
import com.cojeans.osiopso.entity.feed.Article;
import com.cojeans.osiopso.repository.ArticleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ArticleService {

    private final ArticleRepository articleRepository;

    public List<ArticleDto> listFeed() {
        List<ArticleDto> feeds = articleRepository.findFeeds();

        return feeds;
    }

    public boolean writeFeed(ArticleDto articleDto) {
        articleRepository.save(articleDto);
    }
}
