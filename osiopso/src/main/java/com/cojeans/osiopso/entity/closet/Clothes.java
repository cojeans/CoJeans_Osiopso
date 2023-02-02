package com.cojeans.osiopso.entity.closet;

import com.cojeans.osiopso.dto.closet.ClothesDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Getter @Builder @NoArgsConstructor @AllArgsConstructor
public class Clothes {
    @Id @GeneratedValue
    private Long id;

    private String category;

    private String originFilename;

    private String storeFilename;

    public ClothesDto toDto(){
        return ClothesDto.builder()
                .id(id)
                .category(category)
                .originFilename(originFilename)
                .storeFilename(storeFilename)
                .build();
    }

//    public ClothesDto toDto(){
//        return ClothesDto.builder()
//                .id(id)
//                .category(category)
//                .seasons(seasons.stream()
//                        .map(Season::toDto)
//                        .collect(Collectors.toList()))
//                .colors(colors.stream()
//                        .map(Color::toDto)
//                        .collect(Collectors.toList()))
//                .closetClothesDtos(closetClothes.stream()
//                        .map(ClosetClothes::toDto)
//                        .collect(Collectors.toList()))
//                .build();
//    }
}
