package com.cojeans.osiopso.entity.tag;

import com.cojeans.osiopso.dto.tag.TagDto;
import com.cojeans.osiopso.entity.closet.ClothesTag;
import com.cojeans.osiopso.entity.feed.ArticleTag;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;

    private String keyword;

//    @OneToMany(mappedBy = "tag")
//    private List<ArticleTag> articleTags;

    public TagDto toDto(){
        return TagDto.builder()
                .id(id)
                .keyword(keyword)
                .build();
    }

}
