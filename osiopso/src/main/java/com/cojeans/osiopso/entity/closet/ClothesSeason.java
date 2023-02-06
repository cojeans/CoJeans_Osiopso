package com.cojeans.osiopso.entity.closet;

import com.cojeans.osiopso.dto.closet.ClothesSeasonDto;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter @Builder
@AllArgsConstructor @NoArgsConstructor
@ToString
public class ClothesSeason {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CLOTHES_ID")
    private Clothes clothes;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SEASON_ID")
    private Season season;

    public ClothesSeasonDto toDto(){
        return ClothesSeasonDto.builder()
                .id(id)
                .clothesDto(clothes.toDto())
                .seasonDto(season.toDto())
                .build();
    }
}
