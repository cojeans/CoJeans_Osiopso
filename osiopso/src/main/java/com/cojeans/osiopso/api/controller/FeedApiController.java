package com.cojeans.osiopso.api.controller;

import com.cojeans.osiopso.dto.feed.ArticleDto;
import com.cojeans.osiopso.entity.feed.Article;
import com.cojeans.osiopso.repository.article.ArticleRepository;
import com.cojeans.osiopso.service.article.AdviceService;
import com.cojeans.osiopso.service.article.ArticleService;
import com.cojeans.osiopso.service.article.OotdService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    private final AdviceService adviceService;
    private final OotdService ootdService;
    private final ArticleService articleService;


    // ====================== CREATE ========================
    @PostMapping("/article")
    public ResponseEntity<String> createArticle(@RequestBody ArticleDto articleDto) {
        if (articleService.createArticle(articleDto)) {
            return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity<>(FAIL, HttpStatus.NOT_ACCEPTABLE);
    }


    // ====================== DELETE ========================
    @DeleteMapping("/article/{articleno}")
    public ResponseEntity<String> deleteArticle(@PathVariable("articleno") Long articleNo) {
        if (articleService.deleteArticle(articleNo)) {
            return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(FAIL, HttpStatus.NOT_ACCEPTABLE);
        }
    }



    // ====================== READ ========================
    @GetMapping("/ootd")
    public ResponseEntity<List<ArticleDto>> listOotd() {
        return new ResponseEntity<>(ootdService.listOotd(), HttpStatus.OK);
    }

    @GetMapping("/ootd/{articleno}")
    public ResponseEntity<ArticleDto> detailOotd(@PathVariable("articleno") Long articleNo) {
        ArticleDto detail = ootdService.detailOotd(articleNo);
        return new ResponseEntity<>(detail, HttpStatus.OK);
    }


    // ====================== UPDATE ========================
    @PutMapping("/ootd/{articleno}")
    public ResponseEntity<String> editOotd(@PathVariable("articleno") Long articleNo, @RequestBody ArticleDto articleDto) {
        if (ootdService.editOotd(articleNo, articleDto)){
            return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(FAIL, HttpStatus.NOT_ACCEPTABLE);
        }
    }



    // ====================== READ ========================
    @GetMapping("/advice")
    public ResponseEntity<List<ArticleDto>> listAdivce() {
        return new ResponseEntity<>(adviceService.listAdvice(), HttpStatus.OK);
    }

    @GetMapping("/advice/{articleno}")
    public ResponseEntity<ArticleDto> detailAdvice(@PathVariable("articleno") Long articleNo) {
        ArticleDto detail = adviceService.detailAdvice(articleNo);
        return new ResponseEntity<>(detail, HttpStatus.OK);
    }


    // ====================== UPDATE ========================
    @PutMapping("/advice/{articleno}")
    public ResponseEntity<String> editAdvice(@PathVariable("articleno") Long articleNo, @RequestBody ArticleDto articleDto) {
        if (adviceService.editAdvice(articleNo, articleDto)){
            return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(FAIL, HttpStatus.NOT_ACCEPTABLE);
        }
    }
}
