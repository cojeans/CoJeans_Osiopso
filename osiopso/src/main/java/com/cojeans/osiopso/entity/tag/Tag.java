package com.cojeans.osiopso.entity.tag;

import com.cojeans.osiopso.dto.tag.TagDto;
import com.cojeans.osiopso.entity.closet.ClothesTag;
import com.cojeans.osiopso.entity.feed.ArticleTag;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "DTYPE")
public class Tag {
    @Id @GeneratedValue
    private Long id;

    private String keyword;

    @OneToMany(mappedBy = "tag")
    private List<ArticleTag> articleTags;

    @OneToMany(mappedBy = "tag")
    private List<ClothesTag> clothesTags;

    public TagDto toDto(){
        return TagDto.builder()
                .id(id)
                .keyword(keyword)
                .build();
    }

//    public TagDto toDto(){
//        return TagDto.builder()
//                .id(id)
//                .keyword(keyword)
//                .articleTagDtos(articleTags.stream()
//                        .map(ArticleTag::toDto)
//                        .collect(Collectors.toList()))
//                .clothesTagDtos((clothesTags.stream()
//                        .map(ClothesTag::toDto)
//                        .collect(Collectors.toList())))
//                .build();
//    }
}
