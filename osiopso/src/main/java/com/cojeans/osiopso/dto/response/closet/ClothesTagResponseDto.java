package com.cojeans.osiopso.dto.response.closet;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClothesTagResponseDto {
    private Long id;
    private String keyword;
    private String type;
}
