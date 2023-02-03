package com.cojeans.osiopso.dto.closet;

import com.cojeans.osiopso.entity.closet.Clothes;
import com.cojeans.osiopso.entity.closet.Season;
import lombok.*;

@Data
@AllArgsConstructor @NoArgsConstructor
@Builder
public class SeasonDto {
    private Long id;

    private String seasonName;

    public Season toEntity(){
        System.out.println("SeasonDto toEntity");

        return Season.builder()
                .id(id)
                .seasonName(seasonName)
                .build();
    }
}
