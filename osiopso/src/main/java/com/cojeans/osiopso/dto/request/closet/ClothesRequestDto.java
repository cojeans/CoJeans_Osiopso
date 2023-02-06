package com.cojeans.osiopso.dto.request.closet;

import com.cojeans.osiopso.dto.response.closet.ClosetResponseDto;
import com.cojeans.osiopso.dto.response.closet.ClothesTagResponseDto;
import com.cojeans.osiopso.dto.response.closet.ColorResponseDto;
import com.cojeans.osiopso.dto.response.closet.SeasonResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

// 파라미터 : 카테고리, 사진1, 누구? / 옷장, 색깔, 태그(스타일태그, TPO태그)
@Data
@Builder
@AllArgsConstructor @NoArgsConstructor
public class ClothesRequestDto {
    private String category;
    private String originFilename;
    private String storeFilename;
    private List<ClosetResponseDto> closets;
    private List<ColorResponseDto> colors;
    private List<SeasonResponseDto> seasons;
    private List<ClothesTagResponseDto> tags;
}

