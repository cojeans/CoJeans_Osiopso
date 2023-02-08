package com.cojeans.osiopso.controller;

import com.cojeans.osiopso.dto.ApiResponseDto;
import com.cojeans.osiopso.dto.request.comment.CommentRequestDto;
import com.cojeans.osiopso.dto.response.comment.CommentResponseDto;
import com.cojeans.osiopso.repository.comment.CocommentRepository;
import com.cojeans.osiopso.security.UserDetail;
import com.cojeans.osiopso.service.article.CommentService;
import com.cojeans.osiopso.service.article.LikeService;
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
@RequestMapping("/comment")
@Tag(name = "댓글 관련 API")
public class CommentApiController {

    private final CommentService commentService;
    private final LikeService likeService;
    private final CocommentRepository cocommentRepository;


    // ====================== CREATE ========================

    @PostMapping("/{articleno}")
    public ResponseEntity<?> createComment(@RequestBody CommentRequestDto commentRequestDto,
                                           @PathVariable("articleno") Long articleNo,
                                           @AuthenticationPrincipal UserDetail user){
        if (commentService.createComment(commentRequestDto, articleNo, user.getId())) {
            return new ResponseEntity(new ApiResponseDto(true, "createComment Success", null), HttpStatus.OK);
        } else {
            return new ResponseEntity(new ApiResponseDto(false, "createComment Fail", null), HttpStatus.NOT_ACCEPTABLE);
        }
    }


    @PostMapping("/{articleno}/{commentno}")
    public ResponseEntity<?> createCocomment(@RequestBody CommentRequestDto commentRequestDto,
                                             @PathVariable("articleno") Long articleNo,
                                             @PathVariable("commentno") Long commentNo,
                                             @AuthenticationPrincipal UserDetail user){

        if (commentService.createCocomment(commentRequestDto, articleNo, commentNo, user.getId())) {
            return new ResponseEntity(new ApiResponseDto(true, "createCocomment Success", null), HttpStatus.OK);
        } else {
            return new ResponseEntity(new ApiResponseDto(true, "createCocomment Fail", null), HttpStatus.NO_CONTENT);
        }
    }

    @PostMapping("/likecomment/{commentno}")
    public ResponseEntity<?> createCommentLike(@PathVariable("commentno") Long commentNo,
                                               @AuthenticationPrincipal UserDetail user){
        if (likeService.createCommentLike(commentNo, user.getId())) {
            return new ResponseEntity(new ApiResponseDto(true, "createCommentLike Success", null), HttpStatus.OK);
        } else {
            return new ResponseEntity(new ApiResponseDto(false, "createCommentLike Fail", null), HttpStatus.NOT_ACCEPTABLE);
        }
    }


    // ====================== READ ========================

    // rootId comment 를 기준으로 더 불러오기 버튼을 누르면, 4 ~ 10 번째 댓글까지 가져온다. 그 후로는 +10 개의 댓글씩 추가로 로딩
    @GetMapping("/loadmore/{rootid}")
    public ResponseEntity<?> loadMoreComment(@PathVariable("rootid") Long rootId){
        List<CommentResponseDto> commentResponseDtos = commentService.loadMoreComment(rootId, 1L);

        return new ResponseEntity(new ApiResponseDto(true, "loadMoreComment Success", commentResponseDtos), HttpStatus.OK);
    }



    // ====================== UPDATE ========================

    @PutMapping("/{articleno}/{commentno}")
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

    @DeleteMapping("/{articleno}/{commentno}")
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
