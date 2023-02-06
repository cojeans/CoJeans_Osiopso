package com.cojeans.osiopso.dto.tag;


import com.cojeans.osiopso.entity.tag.Tag;
import lombok.*;

@Data
@Builder
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ArticleTagResponseDto {
    private Long id;
    private String keyword;
    private String type;

    public Tag toEntity() {
        return Tag.builder()
                .id(id)
                .type(type)
                .keyword(keyword)
                .build();
    }
}
