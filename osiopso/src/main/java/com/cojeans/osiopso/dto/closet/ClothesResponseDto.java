package com.cojeans.osiopso.dto.closet;

import com.cojeans.osiopso.entity.closet.Closet;
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
    private List<Long> closets;
    private List<Long> colors;
    private List<Long> seasons;
    private List<Long> tags;
}
