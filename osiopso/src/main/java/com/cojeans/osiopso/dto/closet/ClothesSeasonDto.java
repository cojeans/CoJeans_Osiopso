package com.cojeans.osiopso.dto.closet;

import com.cojeans.osiopso.entity.closet.ClothesSeason;
import com.cojeans.osiopso.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor @NoArgsConstructor
@Data
public class ClothesSeasonDto {
    private Long id;

    private String seasonName;

    private ClothesDto clothesDto;

    private SeasonDto seasonDto;

    public ClothesSeason toEntity(User user){
        return ClothesSeason.builder()
                .id(id)
                .clothes(clothesDto.toEntity(user))
                .season(seasonDto.toEntity())
                .build();
    }
}
