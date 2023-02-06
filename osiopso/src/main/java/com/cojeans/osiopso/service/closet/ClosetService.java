package com.cojeans.osiopso.service.closet;

import com.cojeans.osiopso.dto.closet.ClosetDto;
import com.cojeans.osiopso.dto.closet.ClothesDto;
import com.cojeans.osiopso.dto.request.closet.ClothesTagRequestDto;
import com.cojeans.osiopso.entity.closet.Closet;
import com.cojeans.osiopso.entity.closet.ClosetClothes;
import com.cojeans.osiopso.repository.closet.ClosetClothesRepository;
import com.cojeans.osiopso.repository.closet.ClosetRepository;
import com.cojeans.osiopso.repository.closet.ClothesRepository;
import com.cojeans.osiopso.repository.closet.ClothesTagRepository;
import com.cojeans.osiopso.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
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
    public Closet createCloset(ClosetDto closetDto, Long uid){
        System.out.println("Create Closet Service : " + closetDto);

        return closetRepository.save(closetDto.toEntity(userRepository.getById(uid)));
    }

    // 2. R : 옷장 조회
    // 2-1 :사용자 옷장 전체 리스트 조회
    // 파라미터 : 사용자
    // return List<ClosetDto>
    public List<ClosetDto> listCloset(Long uid){
        System.out.println("List Closet Service");

        List<Closet> list = closetRepository.findAllByUserId(uid);

        return list.stream()
                .map(Closet::toDto)
                .collect(Collectors.toList());
    }

    // 2-2 : 최근 저장된 옷의 사진 4개
    public List<ClothesDto> thumbnailCloset(Long id) {
        System.out.println("Thumbnail Closet Service : " + id);

        // ClosetClothes 최신 테이블 4개
        List<ClosetClothes> ccList = closetClothesRepository.findAllByClosetIdOrderByIdDesc(id);

        return ccList.stream()
                .map(c -> clothesRepository.findById(c.getClothes().getId()).orElseThrow().toDto())
                .limit(4)
                .collect(Collectors.toList());
    }

    // 2-3 : 선택 카테고리별 옷 리스트(최신순)
    public List<ClothesDto> categoryList(Long id, String category, List<ClothesTagRequestDto> tags) {
        System.out.println("Category List Service : " + id + " | " + category + tags);
        int size = tags.size();

        // 해당 옷장에 존재하는 모든 옷
        List<ClothesDto> ccList = closetClothesRepository.findAllByClosetIdOrderByIdDesc(id).stream()
                .map(a -> clothesRepository.findById(a.getClothes().getId()).orElseThrow().toDto())
                .collect(Collectors.toList());
        List<ClothesDto> result = new ArrayList<>();
        
        if(category == null) { // 카테고리 : 전체(null)
            if(size == 0){ // 태그 사이즈 0
                // 전체 옷
                return ccList;
            } else { // 태그 사이즈 1 ~
                // 전체 옷 - 태그 : ClothesTag 컬럼이 존재하는지 확인
                for (ClothesDto clothesDto : ccList) {
                    for (ClothesTagRequestDto tag : tags) {
                        if(clothesTagRepository.findByClothesIdAndTagId(clothesDto.getId(), tag.getId()) != null) {
                            result.add(clothesDto);
                            break;
                        }
                    }
                }
                return result;
            }
        } else { // 특정 카테고리
            ccList = ccList.stream()
                    .filter(b -> b.getCategory().equals(category))
                    .collect(Collectors.toList());
            if(size == 0){
                return ccList;
            } else { // 특정 카테고리 + 태그
                for (ClothesDto clothesDto : ccList) {
                    for (ClothesTagRequestDto tag : tags) {
                        if(clothesTagRepository.findByClothesIdAndTagId(clothesDto.getId(), tag.getId()) != null) {
                            result.add(clothesDto);
                            break;
                        }
                    }
                }
                return result;
            }
        }

//        List<ClosetClothes> result = closetClothesRepository.findAllByClosetIdOrderByIdDesc(id);

//        return result.stream()
//                .map(a -> clothesRepository.findById(a.getClothes().getId()).orElseThrow().toDto())
//                .filter(b -> b.getCategory().equals(category))
//                .collect(Collectors.toList());
    }


    // 3. U : 옷장 정보 수정
    public Closet editCloset(ClosetDto closetDto, Long uid){
        System.out.println("Edit Closet Service : " + closetDto);

        return closetRepository.save(closetDto.toEntity(userRepository.getById(uid)));
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
