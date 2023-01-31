package com.cojeans.osiopso.entity.tag;

import com.cojeans.osiopso.entity.closet.ClothesTag;
import com.cojeans.osiopso.entity.feed.ArticleTag;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

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

    String keyword;

//    @OneToMany(mappedBy = "tag")
//    private List<ArticleTag> articleTags;

//    @OneToMany(mappedBy = "tag")
//    private List<ClothesTag> clothesTags;
}
