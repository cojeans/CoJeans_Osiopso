package com.cojeans.osiopso.service.closet;

import com.cojeans.osiopso.dto.request.closet.ClosetRequestDto;
import com.cojeans.osiopso.dto.response.closet.ClosetResponseDto;
import com.cojeans.osiopso.dto.response.closet.ClothesResponseDto;
import com.cojeans.osiopso.dto.response.closet.ClothesTagResponseDto;
import com.cojeans.osiopso.entity.closet.Closet;
import com.cojeans.osiopso.entity.closet.ClosetClothes;
import com.cojeans.osiopso.entity.closet.Clothes;
import com.cojeans.osiopso.repository.closet.ClosetClothesRepository;
import com.cojeans.osiopso.repository.closet.ClosetRepository;
import com.cojeans.osiopso.repository.closet.ClothesRepository;
import com.cojeans.osiopso.repository.closet.ClothesTagRepository;
import com.cojeans.osiopso.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;


@Service
@Transactional(readOnly = false)
@RequiredArgsConstructor
public class ClosetService {

    private final ClosetRepository closetRepository;

    // 연관 Repo
    private final UserRepository userRepository;
    private final ClothesRepository clothesRepository;
    private final ClosetClothesRepository closetClothesRepository;
    private final ClothesTagRepository clothesTagRepository;

    // 연관 Service
    private final ClothesService clothesService;

    // 1. C : 옷장 등록
    // 파라미터 : 이름, 공개여부, 사용자
    // return pk
    public Closet createCloset(ClosetRequestDto closetDto, Long uid){
        System.out.println("Create Closet Service : " + closetDto);

        return closetRepository.save(new Closet().builder()
                        .name(closetDto.getName())
                        .isSelected(closetDto.getIsSelected())
                        .user(userRepository.getById(uid))
                        .build());
    }

    // 2. R : 옷장 조회
    // 2-1 : 현재 로그인한 사용자의 옷장 리스트 조회
    public List<ClosetResponseDto> mylistCloset(Long uid){
        System.out.println("MyList Closet Service");
        
        // 유저의 옷장 리스트
        List<Closet> list = closetRepository.findAllByUserId(uid);
        
        // Resonse 객체 빌드
        List<ClosetResponseDto> result = list.stream()
                .map(c -> new ClosetResponseDto().builder()
                        .id(c.getId())
                        .name(c.getName())
                        .isSelected(c.getIsSelected())
                        .build())
                .collect(Collectors.toList());

        // 결과 리스트 만들기 ~ 옷 가지 수 설정, 썸네일 리스트 설정
        for (int i = 0; i < list.size(); i++) {
            // 옷 가지 수 설정
            result.get(i).setCount(closetClothesRepository.countByClosetId(list.get(i).getId()));

            // 썸네일 리스트 설정
            String[] thumbnails = new String[4];
            Arrays.fill(thumbnails, "null");
            thumbnails = closetClothesRepository.findAllByClosetIdOrderByIdDesc(list.get(i).getId()).stream()
                    .map(a -> clothesRepository.findById(a.getClothes().getId()).orElseThrow())
                    .map(b -> b.getOriginImgUrl())
                    .limit(4)
                    .toArray(String[]::new);

            result.get(i).setThumbnails(thumbnails);
        }

        return result;
    }

    // 2-2 : 선택된 사용자의 옷장 리스트 조회
    public List<ClosetResponseDto> listCloset(String email){
        System.out.println("List Closet Service : " + email);

        Long uid = userRepository.findByEmail(email).orElseThrow().getId();
        List<Closet> list = closetRepository.findAllByUserId(uid);

        List<ClosetResponseDto> result = list.stream()
                .map(c -> new ClosetResponseDto().builder()
                        .id(c.getId())
                        .name(c.getName())
                        .isSelected(c.getIsSelected())
                        .build())
                .collect(Collectors.toList());

        String[] thumbnails = new String[4];
        for (int i = 0; i < list.size(); i++) {
            result.get(i).setCount(closetClothesRepository.countByClosetId(list.get(i).getId()));

            // 썸네일 리스트 설정
            thumbnails = closetClothesRepository.findAllByClosetIdOrderByIdDesc(list.get(i).getId()).stream()
                    .map(a -> clothesRepository.findById(a.getClothes().getId()).orElseThrow())
                    .map(b -> b.getOriginImgUrl())
                    .limit(4)
                    .toArray(String[]::new);

            result.get(i).setThumbnails(thumbnails);
        }

        return result;
    }

    // 2-2 : 최근 저장된 옷의 사진 4개
    public List<ClothesResponseDto> thumbnailCloset(Long id) {
        System.out.println("Thumbnail Closet Service : " + id);

        // ClosetClothes 최신 테이블 4개
        List<ClosetClothes> ccList = closetClothesRepository.findAllByClosetIdOrderByIdDesc(id);

        return ccList.stream()
                .map(a -> clothesRepository.findById(a.getClothes().getId()).orElseThrow())
                .map(b -> new ClothesResponseDto().builder()
                        .id(b.getId())
                        .category(b.getCategory())
                        .originImgUrl(b.getOriginImgUrl())
                        .build())
                .limit(4)
                .collect(Collectors.toList());
    }

    // 2-3 : 선택 카테고리별 옷 리스트(최신순)
    public List<ClothesResponseDto> categoryList(Long id, String category, List<ClothesTagResponseDto> tags) {
        System.out.println("Category List Service : " + id + " | " + category + tags);
        int size = tags.size();

        // 해당 옷장에 존재하는 모든 옷
        List<Clothes> ccList = closetClothesRepository.findAllByClosetIdOrderByIdDesc(id).stream()
                .map(a -> clothesRepository.findById(a.getClothes().getId()).orElseThrow())
                .collect(Collectors.toList());
        List<Clothes> result = new ArrayList<>();
        
        if(category == null) { // 카테고리 : 전체(null)
            if(size == 0){ // 태그 사이즈 0
                // 전체 옷
                return ccList.stream()
                        .map(a -> new ClothesResponseDto().builder()
                                .id(a.getId())
                                .category(a.getCategory())
                                .originImgUrl(a.getOriginImgUrl())
                                .build())
                        .collect(Collectors.toList());
            } else { // 태그 사이즈 1 ~
                // 전체 옷 - 태그 : ClothesTag 컬럼이 존재하는지 확인
                for (Clothes clothes : ccList) {
                    for (ClothesTagResponseDto tag : tags) {
                        if(clothesTagRepository.findByClothesIdAndTagId(clothes.getId(), tag.getId()) != null) {
                            result.add(clothes);
                            break;
                        }
                    }
                }
            }
        } else { // 특정 카테고리
            ccList = ccList.stream()
                    .filter(b -> b.getCategory().equals(category))
                    .collect(Collectors.toList());
            if(size == 0){
                return ccList.stream()
                        .map(a -> new ClothesResponseDto().builder()
                                .id(a.getId())
                                .category(a.getCategory())
                                .originImgUrl(a.getOriginImgUrl())
                                .build())
                        .collect(Collectors.toList());
            } else { // 특정 카테고리 + 태그
                for (Clothes clothes : ccList) {
                    for (ClothesTagResponseDto tag : tags) {
                        if(clothesTagRepository.findByClothesIdAndTagId(clothes.getId(), tag.getId()) != null) {
                            result.add(clothes);
                            break;
                        }
                    }
                }
            }
        }
        return result.stream()
                .map(a -> new ClothesResponseDto().builder()
                        .id(a.getId())
                        .category(a.getCategory())
                        .originImgUrl(a.getOriginImgUrl())
                        .build())
                .collect(Collectors.toList());
    }


    // 3. U : 옷장 정보 수정
    public Closet editCloset(Long id, ClosetRequestDto closetDto, Long uid){
        System.out.println("Edit Closet Service : " + closetDto);

        return closetRepository.save(new Closet().builder()
                        .id(id)
                        .name(closetDto.getName())
                        .isSelected(closetDto.getIsSelected())
                        .user(userRepository.getById(uid))
                        .build());
    }

    // 4. D : 옷장 삭제
    public void deleteCloset(Long id) {
        System.out.println("Delete Closet Service : " + id);

        // 1. 연관 ClosetClothes 삭제
        List<ClosetClothes> closetClothes = closetClothesRepository.findAllByClosetId(id);

        for(ClosetClothes cc : closetClothes){
            // 임의의 옷이 여러 옷장에 등록된 경우 : 연관 컬럼만 삭제
            closetClothesRepository.deleteById(cc.getId());
            
            // 임의의 옷이 해당 옷장에만 등록된 경우 : 임의의 옷 정보를 함께 삭제
            if(closetClothesRepository.findAllByClothesId(cc.getClothes().getId()).size() == 0) {
                clothesService.deleteClothes(cc.getClothes().getId());
            }
        }

        // 2. 해당 옷장 삭제
        closetRepository.deleteById(id);
    }
}
