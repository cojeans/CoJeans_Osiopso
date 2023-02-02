package com.cojeans.osiopso.service;

import com.cojeans.osiopso.dto.closet.ClosetDto;
import com.cojeans.osiopso.entity.closet.Closet;
import com.cojeans.osiopso.repository.ClosetRepository;
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

    // 1. C : 옷장 등록
    // 파라미터 : 이름, 공개여부, 사용자
    // return pk
    public Closet createCloset(ClosetDto closetDto){
        System.out.println("Create Closet Service : " + closetDto);

        return closetRepository.save(closetDto.toEntity());
    }

    // 2. R : 사용자 옷장 전체 리스트 조회
    // 파라미터 : 사용자
    // return List<ClosetDto>
    public List<ClosetDto> listCloset(String email){
        System.out.println("List Closet Service");

        List<Closet> entityList = closetRepository.findAllByEmail(email);

        return entityList.stream()
                .map(Closet::toDto)
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
