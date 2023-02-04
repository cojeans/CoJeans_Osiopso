package com.cojeans.osiopso.dto.closet;

import com.cojeans.osiopso.dto.tag.ArticleTagResponseDto;
import lombok.*;

import java.util.List;

// 파라미터 : 카테고리, 사진1, 누구? / 옷장, 색깔, 태그(스타일태그, TPO태그)
@Data
@Builder
@AllArgsConstructor @NoArgsConstructor
public class ClothesRequestDto {
    private Long id;
    private String category;

    private String originFilename;

    private String storeFilename;

    private String email;

    private List<ClosetDto> closets;

    private List<ColorDto> colors;

    private List<SeasonDto> seasons;

    private List<ArticleTagResponseDto> tags;
}
