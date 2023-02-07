package com.cojeans.osiopso.controller;


import com.cojeans.osiopso.dto.ApiResponseDto;
import com.cojeans.osiopso.dto.request.comment.CommentRequestDto;
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

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/comment")
@Tag(name = "댓글 관련 API")
public class CommentApiController {

    private final CommentService commentService;
    private final LikeService likeService;

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

        commentService.createCocomment(commentRequestDto, articleNo, commentNo, user.getId());
        return new ResponseEntity(new ApiResponseDto(true, "createCocomment Success", null), HttpStatus.OK);
    }

    @PostMapping("likecomment/{commentno}")
    public ResponseEntity<?> createCommentLike(@PathVariable("commentno") Long commentNo,
                                               @AuthenticationPrincipal UserDetail user){
        if (likeService.createCommentLike(commentNo, user.getId())) {
            return new ResponseEntity(new ApiResponseDto(true, "createCommentLike Success", null), HttpStatus.OK);
        } else {
            return new ResponseEntity(new ApiResponseDto(false, "createCommentLike Fail", null), HttpStatus.NOT_ACCEPTABLE);
        }
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
