package com.cojeans.osiopso.entity.closet;

import com.cojeans.osiopso.dto.closet.ClothesColorDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter @Builder
@AllArgsConstructor @NoArgsConstructor
public class ClothesColor {

    @Id @GeneratedValue
    private Long id;

    private String color;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CLOTHES_ID")
    private  Clothes clothes;

    public ClothesColorDto toDto(){
        return ClothesColorDto.builder()
                .id(id)
                .color(color)
                .clothesDto(clothes.toDto())
                .build();
    }
}
