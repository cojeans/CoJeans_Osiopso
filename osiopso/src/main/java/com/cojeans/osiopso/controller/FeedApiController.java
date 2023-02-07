package com.cojeans.osiopso.controller;

import com.cojeans.osiopso.dto.ApiResponseDto;
import com.cojeans.osiopso.dto.request.comment.CommentRequestDto;
import com.cojeans.osiopso.dto.request.feed.AdviceRequestDto;
import com.cojeans.osiopso.dto.request.feed.OotdRequestDto;
import com.cojeans.osiopso.dto.response.feed.*;
import com.cojeans.osiopso.security.UserDetail;
import com.cojeans.osiopso.service.article.*;
import com.cojeans.osiopso.service.user.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
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
    private final CommentService commentService;
    private final LikeService likeService;
    private final UserService userService;



    // ====================== CREATE ========================
    @PostMapping("/advice")
    public ResponseEntity<?> createAdvice(@RequestPart("advice") AdviceRequestDto adviceRequestDto,
                                          @RequestPart("picture") List<MultipartFile> pictures,
                                          @AuthenticationPrincipal UserDetail user
                                          ) {

        if (adviceService.createAdvice(adviceRequestDto, pictures, user.getId())) {
            return new ResponseEntity(new ApiResponseDto(true, "createArticle Success", null), HttpStatus.OK);
        } else {
            return new ResponseEntity(new ApiResponseDto(false, "createArticle Fail", null), HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @PostMapping("/ootd")
    public ResponseEntity<?> createOotd(@RequestPart("ootd") OotdRequestDto ootdRequestDto,
                                        @RequestPart("picture") List<MultipartFile> pictures,
                                        @AuthenticationPrincipal UserDetail user) {

        if (ootdService.createOotd(ootdRequestDto, pictures, user.getId())) {
            return new ResponseEntity(new ApiResponseDto(true, "createArticle Success", null), HttpStatus.OK);
        } else {
            return new ResponseEntity(new ApiResponseDto(false, "createArticle Fail", null), HttpStatus.NOT_ACCEPTABLE);
        }
    }


    @PostMapping("/{articleno}/comment")
    public ResponseEntity<?> createComment(@RequestBody CommentRequestDto commentRequestDto,
                                           @PathVariable("articleno") Long articleNo,
                                           @AuthenticationPrincipal UserDetail user){
        if (commentService.createComment(commentRequestDto, articleNo, user.getId())) {
            return new ResponseEntity(new ApiResponseDto(true, "createComment Success", null), HttpStatus.OK);
        } else {
            return new ResponseEntity(new ApiResponseDto(false, "createComment Fail", null), HttpStatus.NOT_ACCEPTABLE);
        }
    }


    @PostMapping("/{articleno}/likearticle")
    public ResponseEntity<?> createArticleLike(@PathVariable("articleno") Long articleNo,
                                               @AuthenticationPrincipal UserDetail user){
        if (likeService.createArticleLike(articleNo, user.getId())) {
            return new ResponseEntity(new ApiResponseDto(true, "createLike Success", null), HttpStatus.OK);
        } else {
            return new ResponseEntity(new ApiResponseDto(false, "createLike Fail", null), HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @PostMapping("/{commentno}/likecomment")
    public ResponseEntity<?> createCommentLike(@PathVariable("commentno") Long commentNo,
                                               @AuthenticationPrincipal UserDetail user){
        if (likeService.createCommentLike(commentNo, user.getId())) {
            return new ResponseEntity(new ApiResponseDto(true, "createCommentLike Success", null), HttpStatus.OK);
        } else {
            return new ResponseEntity(new ApiResponseDto(false, "createCommentLike Fail", null), HttpStatus.NOT_ACCEPTABLE);
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



    // ====================== UPDATE ========================
    @PutMapping("/ootd/{articleno}")
    public ResponseEntity<?> editOotd(@PathVariable("articleno") Long articleNo,
                                      @RequestPart("ootd") OotdRequestDto ootdRequestDto,
                                      @RequestPart("picture") List<MultipartFile> pictures,
                                      @AuthenticationPrincipal UserDetail user) {
        if (ootdService.editOotd(articleNo, ootdRequestDto, pictures, user.getId())){
            return new ResponseEntity(new ApiResponseDto(true, "editOotd Success", null), HttpStatus.OK);
        } else {
            return new ResponseEntity(new ApiResponseDto(false, "editOotd Fail", null), HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @PutMapping("/advice/{articleno}")
    public ResponseEntity<?> editAdvice(@PathVariable("articleno") Long articleNo,
                                        @RequestPart("advice") AdviceRequestDto adviceRequestDto,
                                        @RequestPart("picture") List<MultipartFile> pictures,
                                        @AuthenticationPrincipal UserDetail user) {
        if (adviceService.editAdvice(articleNo, adviceRequestDto, pictures, user.getId())){
            return new ResponseEntity(new ApiResponseDto(true, "editAdvice Success", null), HttpStatus.OK);
        } else {
            return new ResponseEntity(new ApiResponseDto(false, "editAdvice Fail", null), HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @PutMapping("/{articleno}/comment/{commentno}")
    public ResponseEntity<?> editComment(@PathVariable("articleno") Long articleNo,
                                         @PathVariable("commentno") Long commentNo,
                                         @RequestBody CommentRequestDto commentRequestDto,
                                         @AuthenticationPrincipal UserDetail user){
        if (commentService.editComment(articleNo, commentNo, commentRequestDto, user.getId())) {
            return new ResponseEntity(new ApiResponseDto(true, "editComment Success", null), HttpStatus.OK);
        } else {
            return new ResponseEntity(new ApiResponseDto(false, "editComment Fail", null), HttpStatus.NOT_ACCEPTABLE);
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

    @DeleteMapping("/{articleno}/comment/{commentno}")
    public ResponseEntity<?> deleteComment(@PathVariable("articleno") Long articleNo,
                                           @PathVariable("commentno") Long commentNo,
                                           @AuthenticationPrincipal UserDetail user){
        if (commentService.deleteComment(articleNo, commentNo, user.getId())){
            return new ResponseEntity(new ApiResponseDto(true, "deleteComment Success", null), HttpStatus.OK);
        } else {
            return new ResponseEntity(new ApiResponseDto(false, "deleteComment Fail", null), HttpStatus.NOT_ACCEPTABLE);
        }
    }

}