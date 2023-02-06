package com.cojeans.osiopso.dto.request.closet;

import lombok.*;

import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClothesTagRequestDto implements Serializable {
    private Long id;
    private String keyword;
    private String type;
}
