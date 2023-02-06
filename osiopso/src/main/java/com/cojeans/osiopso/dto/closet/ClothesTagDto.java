package com.cojeans.osiopso.dto.closet;

import com.cojeans.osiopso.dto.tag.ArticleTagResponseDto;
import com.cojeans.osiopso.entity.closet.ClothesTag;
import com.cojeans.osiopso.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor @NoArgsConstructor
public class ClothesTagDto {
    private Long id;

    private ClothesDto clothesDto;

    private ArticleTagResponseDto articleTagResponseDto;

    public ClothesTag toEntity(User user){
        System.out.println("ClothesTag toEntity");

        return ClothesTag.builder()
                .id(id)
                .clothes(clothesDto.toEntity(user))
                .tag(articleTagResponseDto.toEntity())
                .build();
    }
}
