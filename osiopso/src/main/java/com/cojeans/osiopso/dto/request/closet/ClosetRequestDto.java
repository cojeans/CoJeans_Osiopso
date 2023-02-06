package com.cojeans.osiopso.dto.request.closet;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor @NoArgsConstructor
public class ClosetRequestDto {
    private String name;

    private Boolean isSelected;
}
