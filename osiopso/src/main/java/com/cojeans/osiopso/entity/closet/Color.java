package com.cojeans.osiopso.entity.closet;

import com.cojeans.osiopso.dto.closet.ColorDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter @AllArgsConstructor @NoArgsConstructor
@Builder
public class Color {
    @Id @GeneratedValue
    private Long id;

    private String colorName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CLOTHES_ID")
    private Clothes clothes;

    public ColorDto toDto(){
        return ColorDto.builder()
                .id(id)
                .colorName(colorName)
                .clothesDto(clothes.toDto())
                .build();
    }
}
