package com.cojeans.osiopso.service;

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

    public List<Article> listFeed() {
        List<Article> feeds = articleRepository.findFeeds();

        return feeds;
    }

    public boolean writeFeed(Article article) {
        article.setDtype("F");

        articleRepository.writeFeed();

    }
}
