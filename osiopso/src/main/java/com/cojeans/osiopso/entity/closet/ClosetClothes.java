package com.cojeans.osiopso.entity.closet;

import com.cojeans.osiopso.dto.closet.ClosetClothesDto;
import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
public class ClosetClothes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "CLOSET_ID")
    private Closet closet;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
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
