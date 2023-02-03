package com.cojeans.osiopso.service;

import com.cojeans.osiopso.dto.closet.ClosetDto;
import com.cojeans.osiopso.dto.closet.ClothesDto;
import com.cojeans.osiopso.entity.closet.Closet;
import com.cojeans.osiopso.entity.closet.ClosetClothes;
import com.cojeans.osiopso.entity.closet.Clothes;
import com.cojeans.osiopso.repository.closet.ClosetClothesRepository;
import com.cojeans.osiopso.repository.closet.ClosetRepository;
import com.cojeans.osiopso.repository.closet.ClothesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;


@Service
@Transactional(readOnly = false)
@RequiredArgsConstructor
public class ClosetService {

    private final ClosetRepository closetRepository;

    // 연관 Repo
    private final ClothesRepository clothesRepository;
    private final ClosetClothesRepository closetClothesRepository;

    // 1. C : 옷장 등록
    // 파라미터 : 이름, 공개여부, 사용자
    // return pk
    public Closet createCloset(ClosetDto closetDto){
        System.out.println("Create Closet Service : " + closetDto);

        return closetRepository.save(closetDto.toEntity());
    }

    // 2. R : 옷장 조회
    // 2-1 :사용자 옷장 전체 리스트 조회
    // 파라미터 : 사용자
    // return List<ClosetDto>
    public List<ClosetDto> listCloset(String email){
        System.out.println("List Closet Service");

        List<Closet> entityList = closetRepository.findAllByEmail(email);

        return entityList.stream()
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
    public List<ClothesDto> categoryList(Long id, String category) {
        System.out.println("Category List Service : " + id + " | " + category);

        List<ClosetClothes> result = closetClothesRepository.findAllByClosetIdOrderByIdDesc(id);

        return result.stream()
                .map(a -> clothesRepository.findById(a.getClothes().getId()).orElseThrow().toDto())
                .filter(b -> b.getCategory().equals(category))
                .collect(Collectors.toList());
    }


    // 3. U : 옷장 정보 수정
    public Closet modifyCloset(ClosetDto closetDto){
        System.out.println("Modify Closet Service : " + closetDto);

        return closetRepository.save(closetDto.toEntity());
    }

    // 4. D : 옷장 삭제
    public void deleteCloset(Long id) {
        System.out.println("Delete Closet Service : " + id);

        closetRepository.deleteById(id);
    }
}
