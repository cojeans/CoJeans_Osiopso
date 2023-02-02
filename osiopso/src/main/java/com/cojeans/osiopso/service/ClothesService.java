package com.cojeans.osiopso.service;

import com.cojeans.osiopso.dto.closet.*;
import com.cojeans.osiopso.dto.tag.TagDto;
import com.cojeans.osiopso.entity.closet.Clothes;
import com.cojeans.osiopso.repository.ClosetRepository;
import com.cojeans.osiopso.repository.ClothesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = false)
@RequiredArgsConstructor
public class ClothesService {

    private final ClothesRepository clothesRepository;

    // 연결 Repo
    private final ClosetRepository closetRepository;

    // 1. C : 옷 등록
    // 파라미터 : 카테고리, 사진1, 누구? / 옷장, 색깔, 스타일태그, TPO태그
    // 카테고리를 제외한 파라미터는 각각 repo.save 작업 필요
    // return pk
    public Clothes createClothes(RequestClothesDto requestClothesDto){
        System.out.println("Create Clothes Service : " + requestClothesDto);

        // 옷
        ClothesDto clothesDto = ClothesDto.builder()
                .category(requestClothesDto.getCategory())
                .originFilename(requestClothesDto.getOriginFilename())
                .storeFilename(requestClothesDto.getStoreFilename())
                .build();

        Clothes clothes = clothesRepository.save(clothesDto.toEntity());
        Long closetId = clothes.getId();

        Long relateId = null;

        // 옷장
        List<ClosetDto> closets = requestClothesDto.getClosets();
        for(ClosetDto c :closets){ // 프론트에서 id로 넘겨줌
            relateId = closetRepository.findById(c.getId()).orElseThrow().getId();
        }

        // 색
        List<ColorDto> colors = requestClothesDto.getColors();

        // 계절
        List<SeasonDto> seasons = requestClothesDto.getSeasons();

        // 태그
        List<TagDto> tags = requestClothesDto.getTags();

        return null;
    }

    // 2. R :  옷 정보 상세 조회
    public ClothesDto detailClothes(Long clothesNo){
        System.out.println("Detail Clothes Service");

        // 만약 해당 id를 가진 옷이 없는 경우 예외 처리
        Clothes clothes = clothesRepository.findById(clothesNo).orElseThrow();
        return clothes.toDto();
    }
    
    // 3. U :  옷 정보 수정
    
    // 4. D : 옷 삭제
}
