package com.cojeans.osiopso.api.controller;

import com.cojeans.osiopso.dto.feed.ArticleDto;
import com.cojeans.osiopso.entity.feed.Article;
import com.cojeans.osiopso.repository.ArticleRepository;
import com.cojeans.osiopso.service.ArticleService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/feed")
@Api(tags = "게시글 관련 API")
public class FeedApiController {
    private final ArticleRepository articleRepository;

    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private final ArticleService articleService;


    @GetMapping
    public ResponseEntity<List<ArticleDto>> listFeed() {
        return new ResponseEntity<>(articleService.listFeed(), HttpStatus.OK);
    }


    @PostMapping
    public ResponseEntity<String> createFeed(@RequestBody ArticleDto articleDto) {
        if (articleService.createFeed(articleDto)) {
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity<String>(FAIL, HttpStatus.NOT_ACCEPTABLE);
    }


    @GetMapping("/{feedno}")
    public ResponseEntity<ArticleDto> detailFeed(@PathVariable("feedno") Long feedNo) {
        ArticleDto detail = articleService.detailFeed(feedNo);
        return new ResponseEntity<ArticleDto>(detail, HttpStatus.OK);
    }

    @PutMapping("/{feedno}")
    public ResponseEntity<List<Article>> editFeed(@PathVariable int feedno) {
        System.out.println(feedno);
        return null;
    }

    @DeleteMapping("/{feedno}")
    public ResponseEntity<List<Article>> deleteFeed(@PathVariable int feedno) {
        return null;
    }


}
