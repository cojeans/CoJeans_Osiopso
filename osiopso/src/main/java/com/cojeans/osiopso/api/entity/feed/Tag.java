package com.cojeans.osiopso.api.entity.feed;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "DTYPE")
public class Tag {
    @Id @GeneratedValue
    private Long id;

    String keyword;

}
