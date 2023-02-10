package com.cojeans.osiopso.controller;


import com.cojeans.osiopso.dto.ApiResponseDto;
import com.cojeans.osiopso.service.article.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/main")
@Tag(name = "메인 페이지 API")
public class MainApiController {

    private static final Logger LOGGER = LoggerFactory.getLogger(MainApiController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private final ArticleService articleService;
    private final AdviceService adviceService;
    private final OotdService ootdService;
    private final CommentService commentService;
    private final LikeService likeService;

    // 1. 훈수 게시판 논란
    // 1개월 내로 쓰인 훈수 글 찾기
    // 해당 글들의 댓글 수를 기준으로 내림차순 ~ 5개 뽑아내기
    // 서버로 전송한 문자열을 날짜 포맷으로 변환해 DateTime 필드와 비교
    @GetMapping("/burning")
    @Operation(summary = "훈수 게시판의 뜨거운 감자들", description = "훈수 게시판에서 핫한 글들을 보여줍니다.")
    public ResponseEntity<?> burnAdvice() {
        return new ResponseEntity(new ApiResponseDto(true, "burnAdvice Success", adviceService.burnList()), HttpStatus.OK);
    }

    // 2. OOTD 프리뷰
    // 전제 : article_tag에 createTime 컬럼 추가
    // 1개월 내로 생성된 article_tag 리스트 뽑기
    // group by tag_id count : 태그 별 개수 카운팅
    // 내림차순 정렬 ~ 4등까지 -> 해시태그 탭 선택지로 만들기
    // + 이후 ? 해당 탭을 누르면 좋아요를 기준으로 인기글 5개 뽑기
    @GetMapping("/preview")
    @Operation(summary = "요즘 인기있는 스타일 태그들", description = "인기 태그 게시물들을 보여줍니다.")
    public ResponseEntity<?> hotIssue() {
        return new ResponseEntity(new ApiResponseDto(true, "hotIssue Success", ootdService.hotIssue()), HttpStatus.OK);
    }

    // 3. OOTD 팔로잉
    // 여기는 피드 .. 인데 .. 흠 .............
    // 일단 필터링만 구현해봅시다.
    // 어떻게 이을 것인가 ....
}
