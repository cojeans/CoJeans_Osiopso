package com.cojeans.osiopso.api.entity.feed;

import lombok.*;

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

    @OneToMany(mappedBy = "tag")
    private List<ArticleTag> tags;


}
