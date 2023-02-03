package com.cojeans.osiopso.controller;

import com.cojeans.osiopso.dto.closet.*;
import com.cojeans.osiopso.service.closet.ClosetService;
import com.cojeans.osiopso.service.closet.ClothesService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/*
유저Entity, Dto 완료하면 수정해야 됨
 */
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/closet")
@Api(tags = "옷장 관련 API")
public class ClosetApiController {
    private static final Logger LOGGER = LoggerFactory.getLogger(ClosetApiController.class);

    private static final String SUCCESS = "success";

    private static final String FAIL = "fail";

    private final ClosetService closetService;
    private final ClothesService clothesService;

    // 1. C : 옷장 등록
    @PostMapping
    public ResponseEntity<String> createCloset(@RequestBody ClosetDto closetDto){
        LOGGER.info("createCloset() 호출 : " + closetDto);

        if(closetService.createCloset(closetDto) != null) return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        return new ResponseEntity<String>(FAIL, HttpStatus.OK);
    }

    // 2. R : 옷장 조회
    // 2-1 : 사용자 옷장 전체 리스트 조회
    @GetMapping
    public ResponseEntity<List<ClosetDto>> listCloset(@RequestBody Map<String, String> emailMap){
        LOGGER.info("listCloset() 호출 : " + emailMap.get("email"));
        List<ClosetDto> list = closetService.listCloset(emailMap.get("email"));

        return new ResponseEntity<>(list, HttpStatus.OK);

    }

    // 2-2 : 최근 저장된 옷의 사진 4개
    @GetMapping("/{closetno}")
    public ResponseEntity<List<ClothesDto>> thumbnailClothes(@PathVariable(value = "closetno") Long closetNo){
        LOGGER.info("thumbnailClothes() 호출 : " + closetNo);

        return new ResponseEntity<List<ClothesDto>>(closetService.thumbnailCloset(closetNo), HttpStatus.OK);
    }

    // 2-3 : 선택 카테고리별 옷 리스트(order by desc)
    @GetMapping("/{closetno}/{category}")
    public ResponseEntity<List<ClothesDto>> categoryList(@PathVariable (value = "closetno") Long closetNo, @PathVariable String category){
        LOGGER.info("categoryList() 호출 : " + closetNo + " | " + category);

        return new ResponseEntity<List<ClothesDto>>(closetService.categoryList(closetNo, category), HttpStatus.OK);
    }

    // 3. U : 옷장 정보 수정
    @PutMapping
    public ResponseEntity<String> modifyCloset(@RequestBody ClosetDto closetDto){
        LOGGER.info("modifyCloset() 호출");
        LOGGER.info("수정 정보 : " + closetDto);

        if(closetService.modifyCloset(closetDto) != null) return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        return new ResponseEntity<String>(FAIL, HttpStatus.OK);
    }

    // 4. D : 옷장 삭제
    @DeleteMapping
    public ResponseEntity<String> deleteCloset(@RequestBody Map<String, Long> idMap){
        LOGGER.info("deleteCloset() 호출");
        LOGGER.info("삭제 정보 : " + idMap.get("id"));

        closetService.deleteCloset(idMap.get("id"));

        return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
    }

    // =================================== 옷 관련 ===================================
    // 1. C : 옷 등록
    @PostMapping("/clothes")
    public ResponseEntity<String> createClothes(@RequestBody ClothesRequestDto clothesRequestDto){
        LOGGER.info("createClothes() 호출 : " + clothesRequestDto);

        if(clothesService.createClothes(clothesRequestDto) != null) return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        return new ResponseEntity<String>(FAIL, HttpStatus.NOT_FOUND);
    }

    // 2. R : 옷 조회
    // 2-1 : 옷 정보 상세 조회
    @GetMapping("/clothes/{clothesno}")
    public ResponseEntity<ClothesResponseDto> detailClothes(@PathVariable(value = "clothesno") Long clothesNo){
        LOGGER.info("detailCloset() 호출 : " + clothesNo);

        return new ResponseEntity<ClothesResponseDto>(clothesService.detailClothes(clothesNo), HttpStatus.OK);
    }

    // 3. U : 옷 정보 수정
    @PutMapping("/clothes")
    public ResponseEntity<String> modifyClothes(@RequestBody ClothesRequestDto clothesRequestDto){
        LOGGER.info("modifyClothes() 호출 : " + clothesRequestDto);

        clothesService.modifyClothes(clothesRequestDto);
        return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
    }


    // 4. D : 옷 삭제
    @DeleteMapping("/clothes/{clothno}")
    public ResponseEntity<String> deleteClothes(@PathVariable (value = "clothno") Long clothesNo){
        LOGGER.info("deleteClothes() 호출 : " + clothesNo);

        clothesService.deleteClothes(clothesNo);
        return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
    }
}
