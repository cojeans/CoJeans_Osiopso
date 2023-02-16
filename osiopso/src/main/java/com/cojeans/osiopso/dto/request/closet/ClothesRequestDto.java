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

@Data
@Builder
@AllArgsConstructor @NoArgsConstructor
public class ClothesRequestDto {
    private String category;
    private String imageUrl;
    private List<Long> closets;
    private List<String> colors;
    private List<String> seasons;
}

