package com.cojeans.osiopso.api.controller;

import com.cojeans.osiopso.entity.feed.Article;
import com.cojeans.osiopso.service.ArticleService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/feed")
@Api(tags = "게시글 관련 API")
public class FeedApiController {

    private final ArticleService articleService;

    @GetMapping
    public ResponseEntity<List<Article>> listFeed() {
        System.out.println("호출");
        return new ResponseEntity<List<Article>>(articleService.listFeed(), HttpStatus.OK);
    }
}
