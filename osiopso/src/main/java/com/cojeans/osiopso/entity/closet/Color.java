package com.cojeans.osiopso.entity.closet;

import com.cojeans.osiopso.dto.closet.ColorDto;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter @AllArgsConstructor @NoArgsConstructor
@Builder
@ToString
public class Color {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String colorName;

    public ColorDto toDto(){
        return ColorDto.builder()
                .id(id)
                .colorName(colorName)
                .build();
    }
}
