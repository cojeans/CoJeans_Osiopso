package com.cojeans.osiopso.dto.closet;

import com.cojeans.osiopso.entity.closet.Closet;
import com.cojeans.osiopso.entity.user.User;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ClosetDto {
    private Long id;

    private String closetName;

    private Boolean isSelected;



    public Closet toEntity(User user){
        System.out.println("ClosetDto toEntity");

        return  Closet.builder()
                .id(id)
                .closetName(closetName)
                .user(user)
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
