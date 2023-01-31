package com.cojeans.osiopso.dto.feed;


import com.cojeans.osiopso.entity.tag.Tag;
import lombok.*;

@Data
@Builder
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class TagDto {
    private String keyword;

    public Tag toTagEntity() {
        return Tag.builder()
                .keyword(keyword)
                .build();
    }
}
