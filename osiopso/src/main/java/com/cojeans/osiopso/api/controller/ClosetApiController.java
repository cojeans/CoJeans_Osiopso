package com.cojeans.osiopso.api.controller;

import com.cojeans.osiopso.dto.closet.*;
import com.cojeans.osiopso.service.ClosetService;
import com.cojeans.osiopso.service.ClothesService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
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

    // 2. R : 사용자 옷장 전체 리스트 조회
    @GetMapping
    public ResponseEntity<List<ClosetDto>> listCloset(@RequestBody Map<String, String> emailMap){
        LOGGER.info("listCloset() 호출 : " + emailMap.get("email"));
        List<ClosetDto> list = closetService.listCloset(emailMap.get("email"));

        return new ResponseEntity<>(list, HttpStatus.OK);

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
    // RequestDto 분할
    @PostMapping("/clothes")
    public ResponseEntity<String> createClothes(@RequestBody RequestClothesDto requestClothesDto){
        LOGGER.info("createClothes() 호출 : " + requestClothesDto);

        if(clothesService.createClothes(requestClothesDto) != null) return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        return new ResponseEntity<String>(FAIL, HttpStatus.NOT_FOUND);
    }

    // 2. R : 옷 정보 상세 조회
    @GetMapping("/clothes/{clothesno}")
    public ResponseEntity<ClothesDto> detailClothes(@PathVariable Long clothesNo){
        LOGGER.info("detailCloset() 호출 : " + clothesNo);

        return new ResponseEntity<ClothesDto>(clothesService.detailClothes(clothesNo), HttpStatus.OK);
    }


//    // 3. U : 옷 정보 수정
//    @PutMapping("/clothes/{clothesno}")
//
//    // 4. D : 옷 삭제
//    @DeleteMapping("/clothes/{clothesno}")
}
