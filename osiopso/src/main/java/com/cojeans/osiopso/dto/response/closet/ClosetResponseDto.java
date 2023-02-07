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
public class ClosetResponseDto {
    private Long id;

    private String name;

    private Boolean isSelected;

    private Long count;

    private String[] thumbnails;
}