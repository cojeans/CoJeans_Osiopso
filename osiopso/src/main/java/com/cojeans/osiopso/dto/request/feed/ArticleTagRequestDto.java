package com.cojeans.osiopso.dto.request.feed;

import lombok.*;

@Data
@Builder
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ArticleTagRequestDto {

    private String keyword;
    private String type;
}
