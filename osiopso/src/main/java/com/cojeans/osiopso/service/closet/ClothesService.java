package com.cojeans.osiopso.service.closet;

import com.cojeans.osiopso.dto.closet.*;
import com.cojeans.osiopso.dto.tag.TagDto;
import com.cojeans.osiopso.entity.closet.*;
import com.cojeans.osiopso.repository.closet.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = false)
@RequiredArgsConstructor
public class ClothesService {

    private final ClothesRepository clothesRepository;

    // 연결 Repo
    private final ClosetRepository closetRepository;
    private final ClosetClothesRepository closetClothesRepository;
    private final ClothesColorRepository clothesColorRepository;
    private final ClothesSeasonRepository clothesSeasonRepository;
    private final ClothesTagRepository clothesTagRepository;

    // 연결 Repo 단독
    private final ColorRepository colorRepository;
    private final SeasonRepository seasonRepository;
//    private final TagRepository tagRepository; 원석씨랑 머지하면 만들기

    // 1. C : 옷 등록
    // RequestDto 분할
    // 파라미터 : 카테고리, 사진1, 누구? / 옷장, 색깔, 스타일태그, TPO태그
    // 카테고리를 제외한 파라미터는 각각 repo.save 작업 필요
    // return pk
    public Long createClothes(ClothesRequestDto requestClothesDto){
        System.out.println("Create Clothes Service : " + requestClothesDto);

        // 옷
        ClothesDto clothesDto = ClothesDto.builder()
                .category(requestClothesDto.getCategory())
                .originFilename(requestClothesDto.getOriginFilename())
                .storeFilename(requestClothesDto.getStoreFilename())
                .build();

        Clothes clothes = clothesRepository.save(clothesDto.toEntity());
        Long clothesId = clothes.getId();

        Long relateId = null;

        // 옷장
        List<ClosetDto> closets = requestClothesDto.getClosets();
        for(ClosetDto c :closets){
            ClosetClothes result = closetClothesRepository.save(new ClosetClothes().builder()
                    .closet(c.toEntity())
                    .clothes(clothes).build());
        }

        // 색
        List<ColorDto> colors = requestClothesDto.getColors();
        for(ColorDto c :colors){
            ClothesColor result = clothesColorRepository.save(new ClothesColor().builder()
                    .clothes(clothes)
                    .color(c.toEntity())
                    .build());
        }

        // 계절
        List<SeasonDto> seasons = requestClothesDto.getSeasons();
        for(SeasonDto s :seasons){
            ClothesSeason result = clothesSeasonRepository.save(new ClothesSeason().builder()
                    .clothes(clothes)
                    .season(s.toEntity())
                    .build());
        }

        // 태그
        List<TagDto> tags = requestClothesDto.getTags();
        for(TagDto t :tags){
            ClothesTag result = clothesTagRepository.save(new ClothesTag().builder()
                    .clothes(clothes)
                    .tag(t.toEntity())
                    .build());
        }

        return clothesId;
    }

    // 2. R :  옷 조회
    // 2-1. 특정 옷 상세 조회
    public ClothesResponseDto detailClothes(Long clothesNo){
        System.out.println("Detail Clothes Service : " + clothesNo);

        // 만약 해당 id를 가진 옷이 없는 경우 예외 처리

        Clothes clothes = clothesRepository.findById(clothesNo).orElseThrow();

        // 연관 Color
        // c_c테이블에서 컬러id 찾기
        List<Long> colors = clothesColorRepository.findAllByClothesId(clothes.getId()).stream()
                .map(c -> c.getColor().getId())
                .collect(Collectors.toList());

        // 연관 Season
        List<Long> seasons = clothesSeasonRepository.findAllByClothesId(clothes.getId()).stream()
                .map(c -> c.getSeason().getId())
                .collect(Collectors.toList());

        // 연관 Tag
        List<Long> tags = clothesTagRepository.findAllByClothesId(clothes.getId()).stream()
                .map(c -> c.getTag().getId())
                .collect(Collectors.toList());

        return ClothesResponseDto.builder()
                .id(clothes.getId())
                .category(clothes.getCategory())
                .originFilename(clothes.getOriginFilename())
                .storeFilename(clothes.getStoreFilename())
                .colors(colors)
                .seasons(seasons)
                .tags(tags)
                .build();
    }

    // 3. U :  옷 정보 수정
    public void modifyClothes(ClothesRequestDto clothesRequestDto) {
        // 옷 기본 정보
        Clothes clothes = new Clothes().builder()
                .id(clothesRequestDto.getId())
                .category(clothesRequestDto.getCategory())
                .originFilename(clothesRequestDto.getOriginFilename())
                .storeFilename(clothesRequestDto.getStoreFilename())
                .build();

        clothesRepository.save(clothes);

        // 색깔
        // 기존 리스트, 수정 리스트
        // 수정 리스트만큼 돌면서 기존.contains(수정) = false면 추가
        // 기존.length만큼 돌면서 수정.contains(기존) = false면 삭제
        List<ColorDto> oldColors = clothesColorRepository.findAllByClothesId(clothes.getId()).stream()
                .map(a -> colorRepository.findById(a.getColor().getId()).orElseThrow().toDto())
                .collect(Collectors.toList());
        List<ColorDto> newColors = clothesRequestDto.getColors();

        for(ColorDto dto : newColors){
            if(!oldColors.contains(dto)) clothesColorRepository.save(ClothesColor.builder()
                                .clothes(clothes)
                                .color(dto.toEntity())
                                .build());
        }

        int length = oldColors.size();
        for(int i = 0; i < length; i++){  // 빠진 색은 delete
            if(!newColors.contains(oldColors.get(i))) clothesColorRepository.deleteByClothesIdAndColorId(clothes.getId(), oldColors.get(i).getId());
        }

        // 계절
        List<SeasonDto> oldSeasons = clothesSeasonRepository.findAllByClothesId(clothes.getId()).stream()
                .map(a -> seasonRepository.findById(a.getSeason().getId()).orElseThrow().toDto())
                .collect(Collectors.toList());
        List<SeasonDto> newSeasons = clothesRequestDto.getSeasons();

        for(SeasonDto dto : newSeasons){
            if(!oldSeasons.contains(dto)) clothesSeasonRepository.save(ClothesSeason.builder()
                            .clothes(clothes)
                            .season(dto.toEntity())
                            .build());
        }

        length = oldSeasons.size();
        for(int i = 0; i < length; i++){
            if(!newSeasons.contains(oldSeasons.get(i))) clothesSeasonRepository.deleteByClothesIdAndSeasonId(clothes.getId(), oldSeasons.get(i).getId());
        }

        // 태그
        // 머지 후 합니다.
    }

    // 4. D : 옷 삭제
    public void deleteClothes(Long id) {
        System.out.println("Delete Clothes Service : " + id);

        clothesRepository.deleteById(id);
    }


    // ========================== 수정, 삭제 할 때 사용하는 함수 ===========================
    // 색깔, 계절, 태그
    public void deleteClothesColor(Long clothesId, Long colorId){
        clothesColorRepository.deleteByClothesIdAndColorId(clothesId, colorId);
    }

    public void deleteClothesSeason(Long clothesId, Long seasonId){
        clothesSeasonRepository.deleteByClothesIdAndSeasonId(clothesId, seasonId);
    }

    public void deleteClothesTag(Long clothesId, Long tagId){
        clothesTagRepository.deleteByClothesIdAndTagId(clothesId, tagId);
    }

}
