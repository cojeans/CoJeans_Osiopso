package com.cojeans.osiopso.entity.tag;


import com.cojeans.osiopso.dto.tag.TagDto;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

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

    public TagDto toDto(){
        return TagDto.builder()
                .id(id)
                .type(type)
                .keyword(keyword)
                .build();
    }
}
