package com.cojeans.osiopso.dto.closet;

import com.cojeans.osiopso.entity.closet.Clothes;
import com.cojeans.osiopso.entity.closet.Color;
import lombok.*;

@Data
@Builder
@AllArgsConstructor @NoArgsConstructor
public class ColorDto {
    private Long id;

    private String colorName;

    public Color toEntity(){
        System.out.println("ColorDto toEntity");

        return Color.builder()
                .id(id)
                .colorName(colorName)
                .build();
    }
}
