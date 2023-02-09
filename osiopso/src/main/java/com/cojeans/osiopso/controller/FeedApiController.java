package com.cojeans.osiopso.controller;

import com.cojeans.osiopso.dto.ApiResponseDto;
import com.cojeans.osiopso.dto.request.feed.AdviceRequestDto;
import com.cojeans.osiopso.dto.request.feed.OotdRequestDto;
import com.cojeans.osiopso.dto.request.filter.FilterOotdRequestDto;
import com.cojeans.osiopso.dto.response.feed.*;
import com.cojeans.osiopso.security.UserDetail;
import com.cojeans.osiopso.service.article.AdviceService;
import com.cojeans.osiopso.service.article.ArticleService;
import com.cojeans.osiopso.service.article.LikeService;
import com.cojeans.osiopso.service.article.OotdService;
import com.cojeans.osiopso.service.user.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "게시글 관련 API")
public class FeedApiController {
//    private static final String SUCCESS = "success";
//    private static final String FAIL = "fail";

    private final AdviceService adviceService;
    private final OotdService ootdService;
    private final ArticleService articleService;
    private final LikeService likeService;
    private final UserService userService;



    // ====================== CREATE ========================
    @PostMapping("/advice")
    public ResponseEntity<?> createAdvice(@RequestBody AdviceRequestDto adviceRequestDto,
                                          @AuthenticationPrincipal UserDetail user) {

        if (adviceService.createAdvice(adviceRequestDto, user.getId())) {
            return new ResponseEntity(new ApiResponseDto(true, "createArticle Success", null), HttpStatus.OK);
        } else {
            return new ResponseEntity(new ApiResponseDto(false, "createArticle Fail", null), HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @PostMapping("/ootd")
    public ResponseEntity<?> createOotd(@RequestBody OotdRequestDto ootdRequestDto,
                                        @AuthenticationPrincipal UserDetail user) {


        if (ootdService.createOotd(ootdRequestDto, user.getId())) {
            return new ResponseEntity(new ApiResponseDto(true, "createArticle Success", null), HttpStatus.OK);
        } else {
            return new ResponseEntity(new ApiResponseDto(false, "createArticle Fail", null), HttpStatus.NOT_ACCEPTABLE);
        }
    }


    @PostMapping("likearticle/{articleno}")
    public ResponseEntity<?> createArticleLike(@PathVariable("articleno") Long articleNo,
                                               @AuthenticationPrincipal UserDetail user){
        if (likeService.createArticleLike(articleNo, user.getId())) {
            return new ResponseEntity(new ApiResponseDto(true, "createLike Success", null), HttpStatus.OK);
        } else {
            return new ResponseEntity(new ApiResponseDto(false, "createLike Fail", null), HttpStatus.NOT_ACCEPTABLE);
        }
    }



    // ====================== READ ========================
    @GetMapping("/advice")
    public ResponseEntity<List<AdviceListResponseDto>> listAdivce() {
        return new ResponseEntity(new ApiResponseDto(true, "readAdviceList Success", adviceService.listAdvice()), HttpStatus.OK);
    }


    @GetMapping("/advice/{articleno}")
    public ResponseEntity<AdviceDetailResponseDto> detailAdvice(@PathVariable("articleno") Long articleNo) {
        AdviceDetailResponseDto detail = adviceService.detailAdvice(articleNo);
        return new ResponseEntity(new ApiResponseDto(true, "readAdviceDetail Success", detail), HttpStatus.OK);
    }


    @GetMapping("/ootd")
    public ResponseEntity<List<OotdListResponseDto>> listOotd() {
        return new ResponseEntity(new ApiResponseDto(true, "readOotdList Success", ootdService.listOotd()), HttpStatus.OK);
    }


    @GetMapping("/ootd/{articleno}")
    public ResponseEntity<?> detailOotd(@PathVariable("articleno") Long articleNo) {
        OotdDetailResponseDto detail = ootdService.detailOotd(articleNo);
        return new ResponseEntity(new ApiResponseDto(true, "readOotdDetail Success", detail), HttpStatus.OK);
    }

    // 훈수 게시판 제목 검색
    @GetMapping("/advice/search/subject/{subject}")
    public ResponseEntity<?> searchAdviceBySubject(@PathVariable("subject") String subject){
        List<AdviceSearchResponseDto> result = adviceService.searchAdviceBySubject(subject);

        return new ResponseEntity(new ApiResponseDto(true, "searchAdviceBySubject Success", result), HttpStatus.OK);
    }


    // 훈수 게시판 내용 기준 검색
    @GetMapping("/advice/search/content/{content}")
    public ResponseEntity<?> searchAdviceByContent(@PathVariable("content") String content){
        List<AdviceSearchResponseDto> result = adviceService.searchAdviceByContent(content);

        return new ResponseEntity(new ApiResponseDto(true, "searchAdviceByContent Success", result), HttpStatus.OK);
    }


    // Ootd 유저 및 해쉬태그 검색
    @GetMapping("/ootd/search/data/{input}")
    public ResponseEntity<?> searchOotdOrUserByInput(@PathVariable("input") String input) {
        List<OotdSearchByUserResponseDto> searchByUser;

        if (input.toCharArray()[0] == '#') { // 해쉬태그일 경우
            System.out.println("해쉬태그 발견!");
            OotdSearchByHashtagResponseDto searchByHashtag = ootdService.searchOotdByHashtag(input);
            return new ResponseEntity(new ApiResponseDto(true, "ootdSearchByHashtag Success", searchByHashtag), HttpStatus.OK);
        } else { // 유저 닉네임일 경우
            List<UserSearchResponseDto> userList = userService.searchUserByNickname(input);
            return new ResponseEntity(new ApiResponseDto(true, "searchUserByInput Success", userList), HttpStatus.OK);
        }
    }


    // Ootd (스타일 태그, TPO ,나이, 성별) 별 분류
//    @GetMapping("/ootd/filter/{filter}")
//    public ResponseEntity<?> filterOotd(@RequestBody List<FilterOotdRequestDto> filter) {
//        ootdService.filterOotd(filter);
//
//    }


    // ====================== UPDATE ========================
    @PutMapping("/ootd/{articleno}")
    public ResponseEntity<?> editOotd(@PathVariable("articleno") Long articleNo,
                                      @RequestBody OotdRequestDto ootdRequestDto,
                                      @AuthenticationPrincipal UserDetail user) {
        if (ootdService.editOotd(articleNo, ootdRequestDto, user.getId())){
            return new ResponseEntity(new ApiResponseDto(true, "editOotd Success", null), HttpStatus.OK);
        } else {
            return new ResponseEntity(new ApiResponseDto(false, "editOotd Fail", null), HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @PutMapping("/advice/{articleno}")
    public ResponseEntity<?> editAdvice(@PathVariable("articleno") Long articleNo,
                                        @RequestBody AdviceRequestDto adviceRequestDto,
                                        @AuthenticationPrincipal UserDetail user) {
        if (adviceService.editAdvice(articleNo, adviceRequestDto, user.getId())){
            return new ResponseEntity(new ApiResponseDto(true, "editAdvice Success", null), HttpStatus.OK);
        } else {
            return new ResponseEntity(new ApiResponseDto(false, "editAdvice Fail", null), HttpStatus.NOT_ACCEPTABLE);
        }
    }


    // ====================== DELETE ========================
    @DeleteMapping("/article/{articleno}")
    public ResponseEntity<?> deleteArticle(@PathVariable("articleno") Long articleNo,
                                           @AuthenticationPrincipal UserDetail user) {
        if (articleService.deleteArticle(articleNo, user.getId())) {
            return new ResponseEntity(new ApiResponseDto(true, "deleteArticle Success", null), HttpStatus.OK);
        } else {
            return new ResponseEntity(new ApiResponseDto(false, "deleteArticle Fail", null), HttpStatus.NOT_ACCEPTABLE);
        }
    }



}