package com.cojeans.osiopso.controller;

import com.cojeans.osiopso.dto.ApiResponseDto;
import com.cojeans.osiopso.dto.request.feed.AdviceRequestDto;
import com.cojeans.osiopso.dto.request.feed.OotdRequestDto;
import com.cojeans.osiopso.dto.request.filter.FilterOotdRequestDto;
import com.cojeans.osiopso.dto.response.feed.*;
import com.cojeans.osiopso.entity.user.User;
import com.cojeans.osiopso.repository.article.ArticleRepository;
import com.cojeans.osiopso.security.UserDetail;
import com.cojeans.osiopso.service.article.AdviceService;
import com.cojeans.osiopso.service.article.ArticleService;
import com.cojeans.osiopso.service.article.LikeService;
import com.cojeans.osiopso.service.article.OotdService;
import com.cojeans.osiopso.service.user.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
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
    private final ArticleRepository articleRepository;
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

    // http://localhost:8080/api/feed/paging?page=1&size=15&sort=id,DESC
//    @GetMapping("/paging")
//    public ResponseEntity<?> listAdviceScroll(
//            @RequestParam(value = "idx", defaultValue = "0") long idx,
//            @PageableDefault(size = 6, sort = "idx", direction = Sort.Direction.ASC) Pageable pageable) {
//        System.out.println(pageable.getPageNumber());
//        System.out.println(pageable.getPageSize());
//        System.out.println(pageable.getSort());
//        System.out.println(pageable);
//        System.out.println(idx);
//        adviceService.listAdviceScroll(pageable, idx);
//        return null;
//    }

    @GetMapping("/advice")
    public ResponseEntity<?> listAdivce(
            @RequestParam(value = "idx", defaultValue = "0") long idx,
            @PageableDefault(size = 8, sort = "idx", direction = Sort.Direction.ASC) Pageable pageable) {



        // 최초 로딩시점
        if (idx == 0) {
            idx = Long.MAX_VALUE;
        }

        return new ResponseEntity(new ApiResponseDto(true, "readAdviceList Success", adviceService.listAdvice(pageable, idx)), HttpStatus.OK);
    }


    @GetMapping("/advice/{articleno}")
    public ResponseEntity<?> detailAdvice(@PathVariable("articleno") Long articleNo,
                                          @AuthenticationPrincipal UserDetail user) {
        AdviceDetailResponseDto detail = adviceService.detailAdvice(articleNo, user.getId());
        return new ResponseEntity(new ApiResponseDto(true, "readAdviceDetail Success", detail), HttpStatus.OK);
    }


    @GetMapping("/ootd")
    public ResponseEntity<?> listOotd(
            @RequestParam(value = "idx", defaultValue = "0") long idx,
            @PageableDefault(size = 8, sort = "idx", direction = Sort.Direction.ASC) Pageable pageable) {

        // 최초 로딩시점
        if (idx == 0) {
            idx = Long.MAX_VALUE;
        }

        return new ResponseEntity(new ApiResponseDto(true, "readAdviceList Success", ootdService.listOotd(pageable, idx)), HttpStatus.OK);
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
    @GetMapping("/ootd/filter")
    public ResponseEntity<?> filterOotd(@RequestBody FilterOotdRequestDto filter,
                                        @RequestParam(value = "idx", defaultValue = "0") long idx,
                                        @PageableDefault(size = 8, sort = "idx", direction = Sort.Direction.ASC) Pageable pageable,
                                        @AuthenticationPrincipal UserDetail user) {

        // 최초 로딩시점
        if (idx == 0) {
            idx = Long.MAX_VALUE;
        }

        List<OotdListResponseDto> ootdListResponseDtos = ootdService.filterOotd(filter, pageable, idx, user.getId());

        return new ResponseEntity(new ApiResponseDto(true, "filterOotd Success", ootdListResponseDtos), HttpStatus.OK);
    }

    // 현재 로그인한 유저가 팔로잉 중인 사람들의 ootd만 보여주기
    @GetMapping("/ootd/follow")
    public ResponseEntity<?> followOotd(@AuthenticationPrincipal UserDetail userDetail){
        return new ResponseEntity(new ApiResponseDto(true, "followOotdList Success", ootdService.followOotd(userDetail.getId())), HttpStatus.OK);
    }

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

    @PutMapping("/report/{articleno}")
    public ResponseEntity<?> reportArticle(@PathVariable("articleno") Long articleNo){
        articleService.reportArticle(articleNo);
        return new ResponseEntity(new ApiResponseDto(true, "reportArticle Success", null), HttpStatus.OK);
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