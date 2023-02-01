package com.cojeans.osiopso.dto.tag;

import com.cojeans.osiopso.dto.closet.ClothesTagDto;
import com.cojeans.osiopso.dto.feed.ArticleTagDto;
import com.cojeans.osiopso.entity.tag.Tag;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor @NoArgsConstructor
@Builder
public class TagDto {
    private Long id;

    private String keyword;

    private List<ArticleTagDto> articleTagDtos;

    private List<ClothesTagDto> clothesTagDtos;

    public Tag toEntity(){
        System.out.println("TagDto toEntity");

        return Tag.builder()
                .id(id)
                .keyword(keyword)
                .build();
    }

//    public Tag toEntity(){
//        System.out.println("TagDto toEntity");
//
//        return Tag.builder()
//                .id(id)
//                .keyword(keyword)
//                .articleTags(articleTagDtos.stream()
//                        .map(ArticleTagDto::toEntity)
//                        .collect(Collectors.toList()))
//                .clothesTags(clothesTagDtos.stream()
//                        .map(ClothesTagDto::toEntity)
//                        .collect(Collectors.toList())).build();
//    }
}

