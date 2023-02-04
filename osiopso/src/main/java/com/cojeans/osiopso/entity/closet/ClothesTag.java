package com.cojeans.osiopso.entity.closet;

import com.cojeans.osiopso.dto.closet.ClothesTagDto;
import com.cojeans.osiopso.entity.tag.Tag;
import lombok.*;

import javax.persistence.*;
@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ClothesTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "CLOTHES_ID")
    private Clothes clothes;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "TAG_ID")
    private Tag tag;

    public ClothesTagDto toDto(){
        return ClothesTagDto.builder()
                .id(id)
                .clothesDto(clothes.toDto())
                .articleTagResponseDto(tag.toDto())
                .build();
    }
}
