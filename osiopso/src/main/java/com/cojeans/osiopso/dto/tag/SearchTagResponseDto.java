package com.cojeans.osiopso.dto.tag;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SearchTagResponseDto {

    private String keyword;
    private Long cnt;
}
