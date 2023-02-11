package com.cojeans.osiopso.controller;

import com.cojeans.osiopso.dto.request.closet.ClosetRequestDto;
import com.cojeans.osiopso.dto.request.closet.ClothesRequestDto;
import com.cojeans.osiopso.dto.response.closet.ClosetResponseDto;
import com.cojeans.osiopso.dto.response.closet.ClothesDetailResponseDto;
import com.cojeans.osiopso.dto.response.closet.ClothesResponseDto;
import com.cojeans.osiopso.dto.response.closet.ClothesTagResponseDto;
import com.cojeans.osiopso.security.UserDetail;
import com.cojeans.osiopso.service.closet.ClosetService;
import com.cojeans.osiopso.service.closet.ClothesService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

/*
유저Entity, Dto 완료하면 수정해야 됨
 */
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/closet")
@Tag(name = "옷장 관련 API")
public class ClosetApiController {
    private static final Logger LOGGER = LoggerFactory.getLogger(ClosetApiController.class);

    private static final String SUCCESS = "success";

    private static final String FAIL = "fail";

    private final ClosetService closetService;
    private final ClothesService clothesService;

    // 1. C : 옷장 등록
    @PostMapping
    @Operation(summary = "옷장 등록", description = "새로운 옷장을 등록합니다.")
    public ResponseEntity<String> createCloset(@RequestBody ClosetRequestDto closetDto, @AuthenticationPrincipal UserDetail user){
        LOGGER.info("createCloset() 호출 : " + closetDto);

        if(closetService.createCloset(closetDto, user.getId()) != null) return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        return new ResponseEntity<String>(FAIL, HttpStatus.OK);
    }

    // 2. R : 옷장 조회
    // 2-1 : 사용자 옷장 전체 리스트 조회
    @PostMapping("/mylist")
    @Operation(summary = "내 옷장 리스트 조회", description = "현재 로그인한 사용자의 옷장 리스트를 조회합니다.")
    public ResponseEntity<List<ClosetResponseDto>> mylistCloset(@AuthenticationPrincipal UserDetail user){
        LOGGER.info("mylistCloset() 호출");
        List<ClosetResponseDto> list = closetService.mylistCloset(user.getId());

        return new ResponseEntity<>(list, HttpStatus.OK);

    }

    @PostMapping("/list")
    @Operation(summary = "다른 사용자의 옷장 리스트 조회", description = "선택한 사용자의 옷장 리스트를 조회합니다.")
    public ResponseEntity<List<ClosetResponseDto>> listCloset(@RequestParam Long userId, @AuthenticationPrincipal UserDetail user){
        LOGGER.info("listCloset() 호출 : " + userId);
        List<ClosetResponseDto> list = closetService.listCloset(userId);

        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    // 2-2 : 최근 저장된 옷의 사진 4개
    @GetMapping("/{closetno}")
    @Operation(summary = "옷장 썸네일 : 최근 등록된 옷의 사진4", description = "옷장의 썸네일로 쓸 사진 4개를 불러옵니다.")
    public ResponseEntity<List<ClothesResponseDto>> thumbnailClothes(@PathVariable(value = "closetno") Long closetNo, @AuthenticationPrincipal UserDetail user){
        LOGGER.info("thumbnailClothes() 호출 : " + closetNo);

        return new ResponseEntity<List<ClothesResponseDto>>(closetService.thumbnailCloset(closetNo), HttpStatus.OK);
    }

    // 2-3 : 선택 카테고리별 옷 리스트 + 태그 필터(order by desc)
    @PostMapping("/{closetno}/{category}")
    @Operation(summary = "카테고리별 옷 리스트", description = "선택한 카테고리에 속하는 옷 리스트를 조회합니다.")
    public ResponseEntity<List<ClothesResponseDto>> categoryList(@PathVariable (value = "closetno") Long closetNo, @PathVariable String category, @RequestBody List<ClothesTagResponseDto> tags, @AuthenticationPrincipal UserDetail user){
        LOGGER.info("categoryList() 호출 : " + closetNo + " | " + category + " | " + tags);

        return new ResponseEntity<List<ClothesResponseDto>>(closetService.categoryList(closetNo, category, tags), HttpStatus.OK);
    }

    // 3. U : 옷장 정보 수정
    @PutMapping("/{closetno}")
    @Operation(summary = "옷장 정보 수정", description = "선택한 옷장의 이름과 공개 여부를 변경합니다.")
    public ResponseEntity<String> editCloset(@PathVariable (value = "closetno") Long closetNo, @RequestBody ClosetRequestDto closetDto, @AuthenticationPrincipal UserDetail user){
        LOGGER.info("editCloset() 호출 : " + closetDto);

        if(closetService.editCloset(closetNo, closetDto, user.getId()) != null) return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        return new ResponseEntity<String>(FAIL, HttpStatus.OK);
    }

    // 4. D : 옷장 삭제
    @DeleteMapping("/{closetno}")
    @Operation(summary = "옷장 삭제", description = "선택한 옷장을 삭제합니다.")
    public ResponseEntity<String> deleteCloset(@PathVariable (value = "closetno") Long closetNo, @AuthenticationPrincipal UserDetail user){
        LOGGER.info("deleteCloset() 호출 : " + closetNo);

        closetService.deleteCloset(closetNo);

        return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
    }

    // =================================== 옷 관련 ===================================
    // 1. C : 옷 등록
    @PostMapping("/clothes")
    @Operation(summary = "옷 등록", description = "새로운 옷을 등록합니다. closets, colors, seasons, tags 모두 id만 보내도 됨")
    public ResponseEntity<String> createClothes(@RequestBody ClothesRequestDto clothesRequestDto, @AuthenticationPrincipal UserDetail user) throws IOException {
        LOGGER.info("createClothes() 호출 : " + clothesRequestDto);

        if(clothesService.createClothes(clothesRequestDto, user.getId()) != null) return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        return new ResponseEntity<String>(FAIL, HttpStatus.NOT_FOUND);
    }

    // 2. R : 옷 조회
    // 2-1 : 옷 정보 상세 조회
    @GetMapping("/clothes/{clothesno}")
    @Operation(summary = "옷 정보 상세 조회", description = "선택한 옷의 상세 정보를 조회합니다.")
    public ResponseEntity<ClothesDetailResponseDto> detailClothes(@PathVariable(value = "clothesno") Long clothesNo, @AuthenticationPrincipal UserDetail user){
        LOGGER.info("detailCloset() 호출 : " + clothesNo);

        return new ResponseEntity<ClothesDetailResponseDto>(clothesService.detailClothes(clothesNo), HttpStatus.OK);
    }

    // 3. U : 옷 정보 수정
    @PutMapping("/clothes/{clothesno}")
    @Operation(summary = "옷 정보 수정", description = "선택한 옷의 정보를 수정합니다.")
    public ResponseEntity<String> editClothes(@PathVariable (value = "clothesno") Long clothesNo, @RequestBody ClothesRequestDto clothesRequestDto, @AuthenticationPrincipal UserDetail user){
        LOGGER.info("editClothes() 호출 : " + clothesRequestDto);

        clothesService.editClothes(clothesNo, clothesRequestDto, user.getId());
        return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
    }


    // 4. D : 옷 삭제
    @DeleteMapping("/clothes/{clothno}")
    @Operation(summary = "옷 삭제", description = "선택한 옷을 삭제합니다.")
    public ResponseEntity<String> deleteClothes(@PathVariable (value = "clothno") Long clothesNo, @AuthenticationPrincipal UserDetail user){
        LOGGER.info("deleteClothes() 호출 : " + clothesNo);

        clothesService.deleteClothes(clothesNo);
        return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
    }
}
