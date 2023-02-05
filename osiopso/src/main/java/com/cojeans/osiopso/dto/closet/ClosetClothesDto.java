package com.cojeans.osiopso.dto.closet;

import com.cojeans.osiopso.entity.closet.ClosetClothes;
import com.cojeans.osiopso.entity.user.User;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ClosetClothesDto {
    private Long id;

    private ClosetDto closetDto;

    private ClothesDto clothesDto;

    public ClosetClothes toEntity(User user){
        System.out.println("ClosetClothesDto toEntity");

        return ClosetClothes.builder()
                .id(id)
                .closet(closetDto.toEntity(user))
                .clothes(clothesDto.toEntity(user))
                .build();

    }
}
