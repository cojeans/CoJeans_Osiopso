package com.cojeans.osiopso.entity.closet;

import com.cojeans.osiopso.dto.closet.ClosetClothesDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ClosetClothes {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CLOSET_ID")
    private Closet closet;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CLOTHES_ID")
    private Clothes clothes;

    public ClosetClothesDto toDto(){
        return ClosetClothesDto.builder()
                .id(id)
                .closetDto(closet.toDto())
                .clothesDto(clothes.toDto())
                .build();
    }
}
