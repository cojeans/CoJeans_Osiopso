package com.cojeans.osiopso.service.closet;

import com.cojeans.osiopso.dto.request.closet.ClothesRequestDto;
import com.cojeans.osiopso.dto.response.closet.*;
import com.cojeans.osiopso.entity.closet.*;
import com.cojeans.osiopso.entity.user.User;
import com.cojeans.osiopso.repository.closet.*;
import com.cojeans.osiopso.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.IOException;
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

    // 연결 Repo 단독
    private final ColorRepository colorRepository;
    private final SeasonRepository seasonRepository;
    private final UserRepository userRepository;

    // 1. C : 옷 등록
    // RequestDto 분할
    // 파라미터 : 카테고리, 사진1, 누구? / 옷장, 색깔, 스타일태그, TPO태그
    // 카테고리를 제외한 파라미터는 각각 repo.save 작업 필요
    // return pk
    public Long createClothes(ClothesRequestDto clothesRequestDto, Long uid) throws IOException {
        System.out.println("Create Clothes Service : " + clothesRequestDto);

        User user = userRepository.getById(uid);

        Clothes clothes = clothesRepository.save(new Clothes().builder()
                .category(clothesRequestDto.getCategory())
                .imageUrl(clothesRequestDto.getImageUrl())
                .user(user)
                .build());

        Long clothesId = clothes.getId();

        // 옷장
        List<String> closets = clothesRequestDto.getClosets();
        for(String name :closets){
            Closet closet = closetRepository.findByName(name);

            closetClothesRepository.save(new ClosetClothes().builder()
                    .closet(closet)
                    .clothes(clothes)
                    .build());
        }

        // 색
        List<String> colors = clothesRequestDto.getColors();
        for(String name :colors){
            Color color = colorRepository.findByName(name);

            ClothesColor result = clothesColorRepository.save(new ClothesColor().builder()
                    .clothes(clothes)
                    .color(color)
                    .build());
        }

        // 계절
        List<String> seasons = clothesRequestDto.getSeasons();
        for(String name :seasons){
            Season season = seasonRepository.findByName(name);

            ClothesSeason result = clothesSeasonRepository.save(new ClothesSeason().builder()
                    .clothes(clothes)
                    .season(season)
                    .build());
        }

        return clothesId;
    }

    // 2. R :  옷 조회
    // 2-1. 특정 옷 상세 조회
    public ClothesDetailResponseDto detailClothes(Long clothesNo){
        System.out.println("Detail Clothes Service : " + clothesNo);

        // 만약 해당 id를 가진 옷이 없는 경우 예외 처리
        Clothes clothes = clothesRepository.findById(clothesNo).orElseThrow();

        // 연관 Closet
        List<ClosetResponseDto> closets = closetClothesRepository.findAllByClothesId(clothesNo).stream()
                .map(a -> closetRepository.findById(a.getCloset().getId()).orElseThrow())
                .map(b -> new ClosetResponseDto().builder()
                        .id(b.getId())
                        .name(b.getName())
                        .isSelected(b.getIsSelected())
                        .build())
                .collect(Collectors.toList());

        // 연관 Color
        List<ColorResponseDto> colors = clothesColorRepository.findAllByClothesId(clothesNo).stream()
                .map(a -> colorRepository.findById(a.getColor().getId()).orElseThrow())
                .map(b -> new ColorResponseDto().builder()
                        .id(b.getId())
                        .name(b.getName())
                        .build())
                .collect(Collectors.toList());

        // 연관 Season
        List<SeasonResponseDto> seasons = clothesSeasonRepository.findAllByClothesId(clothesNo).stream()
                .map(a -> seasonRepository.findById(a.getSeason().getId()).orElseThrow())
                .map(b -> new SeasonResponseDto().builder()
                        .id(b.getId())
                        .name(b.getName())
                        .build())
                .collect(Collectors.toList());

        return ClothesDetailResponseDto.builder()
                .id(clothesNo)
                .category(clothes.getCategory())
                .imageUrl(clothes.getImageUrl())
                .closets(closets)
                .colors(colors)
                .seasons(seasons)
                .build();
    }

    // 3. U :  옷 정보 수정
    // 사진 수정은 나중에 .. 따로 빼서하기
    public void editClothes(Long id, ClothesRequestDto clothesRequestDto, Long uid) {
        User user = userRepository.getById(uid);

        // 옷 기본 정보
        Clothes clothes = new Clothes().builder()
                .id(id)
                .category(clothesRequestDto.getCategory())
                .imageUrl(clothesRequestDto.getImageUrl())
                .user(user)
                .build();

        clothesRepository.save(clothes);

        // 기존 리스트, 수정 리스트
        // 수정 리스트만큼 돌면서 기존.contains(수정) = false면 추가
        // 기존.length만큼 돌면서 수정.contains(기존) = false면 삭제
        // 옷장
        List<String> oldClosets = closetClothesRepository.findAllByClothesId(id).stream()
                .map(a -> closetRepository.findById(a.getCloset().getId()).orElseThrow())
                .map(b -> b.getName())
                .collect(Collectors.toList());
        List<String> newClosets = clothesRequestDto.getClosets();

        for(String name : newClosets){
            if(!oldClosets.contains(name)) {
                closetClothesRepository.save(ClosetClothes.builder()
                        .clothes(clothes)
                        .closet(closetRepository.findByName(name))
                        .build());
            }
        }

        int length = oldClosets.size();
        for(int i = 0; i < length; i++){
            if(!newClosets.contains(oldClosets.get(i))) deleteClosetClothes(id, closetRepository.findByName(oldClosets.get(i)).getId());
        }

        // 색깔
        List<String> oldColors = clothesColorRepository.findAllByClothesId(id).stream()
                .map(a -> colorRepository.findById(a.getColor().getId()).orElseThrow())
                .map(b -> b.getName())
                .collect(Collectors.toList());
        List<String> newColors = clothesRequestDto.getColors();

        for(String name : newColors){ // 새로운 색 insert
            if(!oldColors.contains(name)) clothesColorRepository.save(ClothesColor.builder()
                                .clothes(clothes)
                                .color(colorRepository.findByName(name))
                                .build());
        }

        length = oldColors.size();
        for(int i = 0; i < length; i++){  // 빠진 색 delete
              if(!newColors.contains(oldColors.get(i))) deleteClothesColor(id, colorRepository.findByName(oldColors.get(i)).getId());
        }

        // 계절
        List<String> oldSeasons = clothesSeasonRepository.findAllByClothesId(id).stream()
                .map(a -> seasonRepository.findById(a.getSeason().getId()).orElseThrow())
                .map(b -> b.getName())
                .collect(Collectors.toList());
        List<String> newSeasons = clothesRequestDto.getSeasons();

        for(String name : newSeasons){
            if(!oldSeasons.contains(name)) clothesSeasonRepository.save(ClothesSeason.builder()
                            .clothes(clothes)
                            .season(seasonRepository.findByName(name))
                            .build());
        }

        length = oldSeasons.size();
        for(int i = 0; i < length; i++){
            if(!newSeasons.contains(oldSeasons.get(i))) deleteClothesSeason(id, colorRepository.findByName(oldSeasons.get(i)).getId());
        }

    }

    // 4. D : 옷 삭제
    public void deleteClothes(Long id) {
        System.out.println("Delete Clothes Service : " + id);

        // 삭제 할 옷의 PK
        Clothes clothes = clothesRepository.getById(id);

        // 1. ClosetClothes
        closetClothesRepository.deleteAllByClothesId(id);

        // 2. ClothesColor
        clothesColorRepository.deleteAllByClothesId(id);

        // 3. ClothesSeason
        clothesSeasonRepository.deleteAllByClothesId(id);

        // 4. Clothes
        clothesRepository.deleteById(id);
    }


    // ========================== 수정할 때 사용하는 함수 ===========================
    // 옷장
    private void deleteClosetClothes(Long clothesId, Long closetId) {
        closetClothesRepository.deleteByClothesIdAndClosetId(clothesId, closetId);
    }

    // 색깔
    public void deleteClothesColor(Long clothesId, Long colorId){
        clothesColorRepository.deleteByClothesIdAndColorId(clothesId, colorId);
    }

    // 계절
    public void deleteClothesSeason(Long clothesId, Long seasonId){
        clothesSeasonRepository.deleteByClothesIdAndSeasonId(clothesId, seasonId);
    }

}
