package com.cojeans.osiopso.entity.closet;

import com.cojeans.osiopso.dto.closet.ClothesSeasonDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter @Builder
@AllArgsConstructor @NoArgsConstructor
public class ClothesSeason {

    @Id @GeneratedValue
    private Long id;

    private String season;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CLOTHES_ID")
    private Clothes clothes;

    public ClothesSeasonDto toDto(){
        return ClothesSeasonDto.builder()
                .id(id)
                .season(season)
                .clothesDto(clothes.toDto())
                .build();
    }
}
