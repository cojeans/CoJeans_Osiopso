package com.cojeans.osiopso.dto.tag;


import lombok.*;

@Data
@Builder
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class TagDto {
    private Long id;
    private String keyword;

    private String type;

    public Tag toEntity() {
        return Tag.builder()
                .type(type)
                .keyword(keyword)
                .build();
    }
}
