package com.cojeans.osiopso.dto.closet;

import com.cojeans.osiopso.entity.closet.ClothesColor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor @NoArgsConstructor
@Data
public class ClothesColorDto {
    private Long id;
    private String color;

    private ClothesDto clothesDto;

    public ClothesColor toEntity(){
        return ClothesColor.builder()
                .id(id)
                .color(color)
                .clothes(clothesDto.toEntity())
                .build();
    }

}
