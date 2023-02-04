package com.cojeans.osiopso.controller;

import com.cojeans.osiopso.dto.request.comment.CommentRequestDto;
import com.cojeans.osiopso.dto.request.feed.ArticleRequestDto;
import com.cojeans.osiopso.dto.response.feed.AdviceListResponseDto;
import com.cojeans.osiopso.dto.response.feed.ArticleDetailResponseDto;
import com.cojeans.osiopso.dto.response.feed.OotdListResponseDto;
import com.cojeans.osiopso.entity.user.User;
import com.cojeans.osiopso.security.UserDetail;
import com.cojeans.osiopso.service.article.AdviceService;
import com.cojeans.osiopso.service.article.ArticleService;
import com.cojeans.osiopso.service.article.CommentService;
import com.cojeans.osiopso.service.article.OotdService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/feed")
@Api(tags = "게시글 관련 API")
public class FeedApiController {
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private final AdviceService adviceService;
    private final OotdService ootdService;
    private final ArticleService articleService;
    private final CommentService commentService;



    // ====================== CREATE ========================
    @PostMapping("/article")
    public ResponseEntity<String> createArticle(@RequestBody ArticleRequestDto articleRequestDto, @AuthenticationPrincipal UserDetail user) {
        System.out.println(user);
        if (articleService.createArticle(articleRequestDto, user.getId())) {
            return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity<>(FAIL, HttpStatus.NOT_ACCEPTABLE);
    }


    // ====================== READ ========================
    @GetMapping("/advice")
    public ResponseEntity<List<AdviceListResponseDto>> listAdivce() {
        return new ResponseEntity<>(adviceService.listAdvice(), HttpStatus.OK);
    }


    @GetMapping("/advice/{articleno}")
    public ResponseEntity<ArticleDetailResponseDto> detailAdvice(@PathVariable("articleno") Long articleNo) {
        ArticleDetailResponseDto detail = adviceService.detailAdvice(articleNo);
        return new ResponseEntity<>(detail, HttpStatus.OK);
    }


    @GetMapping("/ootd")
    public ResponseEntity<List<OotdListResponseDto>> listOotd() {
        return new ResponseEntity<>(ootdService.listOotd(), HttpStatus.OK);
    }


    @GetMapping("/ootd/{articleno}")
    public ResponseEntity<ArticleDetailResponseDto> detailOotd(@PathVariable("articleno") Long articleNo) {
        ArticleDetailResponseDto detail = ootdService.detailOotd(articleNo);
        return new ResponseEntity<>(detail, HttpStatus.OK);
    }


    // ====================== UPDATE ========================
    @PutMapping("/ootd/{articleno}")
    public ResponseEntity<String> editOotd(@PathVariable("articleno") Long articleNo, @RequestBody ArticleRequestDto articleRequestDto) {
        if (ootdService.editOotd(articleNo, articleRequestDto)){
            return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(FAIL, HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @PutMapping("/advice/{articleno}")
    public ResponseEntity<String> editAdvice(@PathVariable("articleno") Long articleNo, @RequestBody ArticleRequestDto articleRequestDto) {
        if (adviceService.editAdvice(articleNo, articleRequestDto)){
            return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(FAIL, HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @PutMapping("/{articleno}/comment/{commentno}")
    public ResponseEntity<String> editComment(@PathVariable("articleno") Long articleno, @PathVariable("commentno") Long commentno, @RequestBody CommentRequestDto commentRequestDto){
        commentService.editComment(articleno, commentno, commentRequestDto);

        return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
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

    @DeleteMapping("/{articleno}/comment/{commentno}")
    public ResponseEntity<String> deleteComment(@PathVariable("articleno") Long articleno, @PathVariable("commentno") Long commentno){
        if (commentService.deleteComment(articleno, commentno)){
            return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(FAIL, HttpStatus.NOT_ACCEPTABLE);
        }
    }

}
