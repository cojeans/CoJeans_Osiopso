package com.cojeans.osiopso.entity.closet;

import com.cojeans.osiopso.dto.closet.ClothesDto;
import com.cojeans.osiopso.entity.user.User;
import lombok.*;

import javax.persistence.*;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Getter @Builder @NoArgsConstructor @AllArgsConstructor
@ToString
public class Clothes {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String category;

    private String originFilename;

    private String storeFilename;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

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
