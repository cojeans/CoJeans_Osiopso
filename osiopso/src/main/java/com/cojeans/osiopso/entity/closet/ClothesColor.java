package com.cojeans.osiopso.entity.closet;

import com.cojeans.osiopso.dto.closet.ClothesColorDto;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter @Builder
@AllArgsConstructor @NoArgsConstructor
@ToString
public class ClothesColor {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CLOTHES_ID")
    private  Clothes clothes;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "COLOR_ID")
    private  Color color;

    public ClothesColorDto toDto(){
        return ClothesColorDto.builder()
                .id(id)
                .clothesDto(clothes.toDto())
                .colorDto(color.toDto())
                .build();
    }
}
