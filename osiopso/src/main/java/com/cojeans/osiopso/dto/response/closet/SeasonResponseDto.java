package com.cojeans.osiopso.dto.response.closet;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SeasonResponseDto {
    private Long id;
    private String name;
}
