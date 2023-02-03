package com.cojeans.osiopso.dto.closet;

import com.cojeans.osiopso.entity.closet.ClosetClothes;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ClosetClothesDto {
    private Long id;

    private ClosetDto closetDto;

    private ClothesDto clothesDto;

    public ClosetClothes toEntity(){
        System.out.println("ClosetClothesDto toEntity");

        return ClosetClothes.builder()
                .id(id)
                .closet(closetDto.toEntity())
                .clothes(clothesDto.toEntity())
                .build();

    }
}
