package com.cojeans.osiopso.dto.closet;

import com.cojeans.osiopso.entity.closet.Closet;
import com.cojeans.osiopso.entity.closet.ClosetClothes;
import com.cojeans.osiopso.entity.user.User;
import lombok.*;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ClosetDto {
    private Long id;

    private String closetName;

    // private User user; // 임포트 dto로 추후 수정 ?
    private String email; // 임시로 유저 이메일을 받습니다.

    private Boolean isSelected;



    public Closet toEntity(){
        System.out.println("ClosetDto toEntity");

        return  Closet.builder()
                .id(id)
                .closetName(closetName)
                .email(email) // 추후 Dto로 수정
                .isSelected(isSelected)
                .build();

    }

//    public Closet toEntity(){
//        System.out.println("ClosetDto toEntity");
//
//        return  Closet.builder()
//                .id(id)
//                .closetName(closetName)
//                .isSelected(isSelected)
//                .user(user) // 추후 Dto로 수정
////                .closetClothes(closetClothesDto.toEntity()).build(); // List라 오류
//                .closetClothes(closetClothesDtos
//                        .stream()
//                        .map(ClosetClothesDto::toEntity)
//                        .collect(Collectors.toList())).build();
//
//    }
}
