package com.cojeans.osiopso.dto.closet;

import com.cojeans.osiopso.entity.closet.ClothesSeason;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor @NoArgsConstructor
@Data
public class ClothesSeasonDto {
    private Long id;

    private String season;

    private ClothesDto clothesDto;

    public ClothesSeason toEntity(){
        return ClothesSeason.builder()
                .id(id)
                .season(season)
                .clothes(clothesDto.toEntity())
                .build();
    }
}
