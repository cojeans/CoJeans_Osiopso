package com.cojeans.osiopso.dto.closet;

import com.cojeans.osiopso.entity.closet.ClosetClothes;
import com.cojeans.osiopso.entity.closet.Clothes;
import lombok.*;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ClothesDto {
    private Long id;

    private String category;

    private String originFilename;

    private String storeFilename;

    public Clothes toEntity(){
        System.out.println("Clothes toEntity");

        return Clothes.builder()
                .id(id)
                .category(category)
                .originFilename(originFilename)
                .storeFilename(storeFilename)
                .build();
    }

//    public Clothes toEntity(){
//        System.out.println("Clothes toEntity");
//
//        return Clothes.builder()
//                .id(id)
//                .category(category)
//                .seasons(seasons.stream()
//                        .map(SeasonDto::toEntity)
//                        .collect(Collectors.toList()))
//                .colors(colors.stream()
//                        .map(ColorDto::toEntity)
//                        .collect(Collectors.toList()))
//                .closetClothes(closetClothesDtos.stream()
//                        .map(ClosetClothesDto::toEntity)
//                        .collect(Collectors.toList())).build();
//    }
}
