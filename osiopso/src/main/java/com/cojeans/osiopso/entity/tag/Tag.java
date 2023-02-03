package com.cojeans.osiopso.entity.tag;

import com.cojeans.osiopso.entity.closet.ClothesTag;
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

    @OneToMany(mappedBy = "tag", cascade = CascadeType.PERSIST)
    private List<ClothesTag> clothesTags;
}
