package com.cojeans.osiopso.entity.closet;

import com.cojeans.osiopso.dto.closet.SeasonDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@AllArgsConstructor @NoArgsConstructor
@Builder
public class Season {
    @Id
    @GeneratedValue
    private Long id;

    private String seasonName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CLOTHES_ID")
    private Clothes clothes;

    public SeasonDto toDto(){
        return SeasonDto.builder()
                .id(id)
                .seasonName(seasonName)
                .clothesDto(clothes.toDto())
                .build();
    }
}
