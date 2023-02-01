package com.cojeans.osiopso.dto.closet;

import com.cojeans.osiopso.entity.closet.Color;
import lombok.*;

@Data
@Builder
@AllArgsConstructor @NoArgsConstructor
public class ColorDto {
    private Long id;

    private String colorName;

    private ClothesDto clothesDto;

    public Color toEntity(){
        System.out.println("ColorDto toEntity");

        return Color.builder()
                .id(id)
                .colorName(colorName)
                .clothes(clothesDto.toEntity()).build();
    }
}
