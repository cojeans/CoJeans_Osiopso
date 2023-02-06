package com.cojeans.osiopso.dto.response.closet;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ClothesResponseDto {
    private Long id;
    private String category;
    private String originFilename;
    private String storeFilename;
    private List<ClosetResponseDto> closets;
    private List<ColorResponseDto> colors;
    private List<SeasonResponseDto> seasons;
    private List<ClothesTagResponseDto> tags;
}