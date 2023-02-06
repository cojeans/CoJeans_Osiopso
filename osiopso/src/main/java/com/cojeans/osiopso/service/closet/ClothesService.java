package com.cojeans.osiopso.service.closet;

import com.cojeans.osiopso.dto.request.closet.ClothesRequestDto;
import com.cojeans.osiopso.dto.response.closet.*;
import com.cojeans.osiopso.entity.closet.*;
import com.cojeans.osiopso.entity.tag.Tag;
import com.cojeans.osiopso.entity.user.User;
import com.cojeans.osiopso.repository.article.TagRepository;
import com.cojeans.osiopso.repository.closet.*;
import com.cojeans.osiopso.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

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
    private final ClothesTagRepository clothesTagRepository;

    // 연결 Repo 단독
    private final ColorRepository colorRepository;
    private final SeasonRepository seasonRepository;
    private final TagRepository tagRepository;
    private final UserRepository userRepository;

    // 1. C : 옷 등록
    // RequestDto 분할
    // 파라미터 : 카테고리, 사진1, 누구? / 옷장, 색깔, 스타일태그, TPO태그
    // 카테고리를 제외한 파라미터는 각각 repo.save 작업 필요
    // return pk
    public Long createClothes(ClothesRequestDto clothesRequestDto, MultipartFile picture, Long uid) throws IOException {
        System.out.println("Create Clothes Service : " + clothesRequestDto);

        User user = userRepository.getById(uid);
        // 옷
        String path = System.getProperty("user.dir"); // 현재 디렉토리
        File file = new File(path + "/src/main/resources/static/" + picture.getOriginalFilename());
        
        if(!file.getParentFile().exists()) file.getParentFile().mkdir();
        picture.transferTo(file);

        ClothesDetailResponseDto clothesDto = ClothesDetailResponseDto.builder()
                .category(clothesRequestDto.getCategory())
                .originFilename(file.getName())
                .storeFilename(file.getPath())
                .build();

        Clothes clothes = clothesRepository.save(new Clothes().builder()
                        .category(clothesDto.getCategory())
                        .originFilename(file.getName())
                        .storeFilename(file.getPath())
                        .user(user)
                        .build());

        Long clothesId = clothes.getId();

        // 옷장
        List<ClosetResponseDto> closets = clothesRequestDto.getClosets();
        for(ClosetResponseDto c :closets){
            closetClothesRepository.save(new ClosetClothes().builder()
                    .closet(new Closet().builder()
                            .id(c.getId())
                            .name(c.getName())
                            .isSelected(c.getIsSelected())
                            .user(user)
                            .build())
                    .clothes(clothes)
                    .build());
        }

        // 색
        List<ColorResponseDto> colors = clothesRequestDto.getColors();
        for(ColorResponseDto c :colors){
            ClothesColor result = clothesColorRepository.save(new ClothesColor().builder()
                    .clothes(clothes)
                    .color(new Color().builder()
                            .id(c.getId())
                            .name(c.getName())
                            .build())
                    .build());
        }

        // 계절
        List<SeasonResponseDto> seasons = clothesRequestDto.getSeasons();
        for(SeasonResponseDto s :seasons){
            ClothesSeason result = clothesSeasonRepository.save(new ClothesSeason().builder()
                    .clothes(clothes)
                    .season(new Season().builder()
                            .id(s.getId())
                            .name(s.getName())
                            .build())
                    .build());
        }

        // 태그
        List<ClothesTagResponseDto> tags = clothesRequestDto.getTags();
        for(ClothesTagResponseDto t :tags){
            ClothesTag result = clothesTagRepository.save(new ClothesTag().builder()
                    .clothes(clothes)
                    .tag(new Tag().builder()
                            .id(t.getId())
                            .keyword(t.getKeyword())
                            .type(t.getType())
                            .build())
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

        // 연관 Tag
        List<ClothesTagResponseDto> tags = clothesTagRepository.findAllByClothesId(clothesNo).stream()
                .map(a -> tagRepository.findById(a.getTag().getId()).orElseThrow())
                .map(b -> new ClothesTagResponseDto().builder()
                        .id(b.getId())
                        .keyword(b.getKeyword())
                        .type(b.getType())
                        .build())
                .collect(Collectors.toList());

        return ClothesDetailResponseDto.builder()
                .id(clothesNo)
                .category(clothes.getCategory())
                .originFilename(clothes.getOriginFilename())
                .storeFilename(clothes.getStoreFilename())
                .closets(closets)
                .colors(colors)
                .seasons(seasons)
                .tags(tags)
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
                .originFilename(clothesRequestDto.getOriginFilename())
                .storeFilename(clothesRequestDto.getStoreFilename())
                .user(user)
                .build();

        clothesRepository.save(clothes);

        // 기존 리스트, 수정 리스트
        // 수정 리스트만큼 돌면서 기존.contains(수정) = false면 추가
        // 기존.length만큼 돌면서 수정.contains(기존) = false면 삭제
        // 옷장
        List<ClosetResponseDto> oldClosets = closetClothesRepository.findAllByClothesId(id).stream()
                .map(a -> closetRepository.findById(a.getCloset().getId()).orElseThrow())
                .map(b -> new ClosetResponseDto().builder()
                        .id(b.getId())
                        .name(b.getName())
                        .isSelected(b.getIsSelected())
                        .build())
                .collect(Collectors.toList());
        List<ClosetResponseDto> newClosets = clothesRequestDto.getClosets();

        for(ClosetResponseDto dto : newClosets){
            if(!oldClosets.contains(dto)) closetClothesRepository.save(ClosetClothes.builder()
                    .clothes(clothes)
                    .closet(new Closet().builder()
                            .id(dto.getId())
                            .name(dto.getName())
                            .isSelected(dto.getIsSelected())
                            .build())
                    .build());
        }

        int length = oldClosets.size();
        for(int i = 0; i < length; i++){
            if(!newClosets.contains(oldClosets.get(i))) deleteClosetClothes(id, oldClosets.get(i).getId());
        }

        // 색깔
        List<ColorResponseDto> oldColors = clothesColorRepository.findAllByClothesId(id).stream()
                .map(a -> colorRepository.findById(a.getColor().getId()).orElseThrow())
                .map(b -> new ColorResponseDto().builder()
                        .id(b.getId())
                        .name(b.getName())
                        .build())
                .collect(Collectors.toList());
        List<ColorResponseDto> newColors = clothesRequestDto.getColors();

        for(ColorResponseDto dto : newColors){ // 새로운 색 insert
            if(!oldColors.contains(dto)) clothesColorRepository.save(ClothesColor.builder()
                                .clothes(clothes)
                                .color(new Color().builder()
                                        .id(dto.getId())
                                        .name(dto.getName())
                                        .build())
                                .build());
        }

        length = oldColors.size();
        for(int i = 0; i < length; i++){  // 빠진 색 delete
              if(!newColors.contains(oldColors.get(i))) deleteClothesColor(id, oldColors.get(i).getId());
        }

        // 계절
        List<SeasonResponseDto> oldSeasons = clothesSeasonRepository.findAllByClothesId(id).stream()
                .map(a -> seasonRepository.findById(a.getSeason().getId()).orElseThrow())
                .map(b -> new SeasonResponseDto().builder()
                        .id(b.getId())
                        .name(b.getName())
                        .build())
                .collect(Collectors.toList());
        List<SeasonResponseDto> newSeasons = clothesRequestDto.getSeasons();

        for(SeasonResponseDto dto : newSeasons){
            if(!oldSeasons.contains(dto)) clothesSeasonRepository.save(ClothesSeason.builder()
                            .clothes(clothes)
                            .season(new Season().builder()
                                    .id(dto.getId())
                                    .name(dto.getName())
                                    .build())
                            .build());
        }

        length = oldSeasons.size();
        for(int i = 0; i < length; i++){
            if(!newSeasons.contains(oldSeasons.get(i))) deleteClothesSeason(id, oldSeasons.get(i).getId());
        }

        // 태그
        List<ClothesTagResponseDto> oldTags = clothesTagRepository.findAllByClothesId(id).stream()
                .map(a -> tagRepository.findById(a.getTag().getId()).orElseThrow())
                .map(b -> new ClothesTagResponseDto().builder()
                        .id(b.getId())
                        .keyword(b.getKeyword())
                        .type(b.getType())
                        .build())
                .collect(Collectors.toList());
        List<ClothesTagResponseDto> newTags = clothesRequestDto.getTags();

        for(ClothesTagResponseDto dto : newTags){
            if(!oldTags.contains(dto)) clothesTagRepository.save(ClothesTag.builder()
                    .clothes(clothes)
                    .tag(new Tag().builder()
                            .id(dto.getId())
                            .keyword(dto.getKeyword())
                            .type(dto.getType())
                            .build())
                    .build());
        }

        length = oldTags.size();
        for(int i = 0; i < length; i++){
            if(!newTags.contains(oldTags.get(i))) deleteClothesTag(id, oldTags.get(i).getId());
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

        // 4. ClothesTag
        clothesTagRepository.deleteAllByClothesId(id);

        // 5. Clothes
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

    // 태그
    public void deleteClothesTag(Long clothesId, Long tagId){
        clothesTagRepository.deleteByClothesIdAndTagId(clothesId, tagId);
    }

}
