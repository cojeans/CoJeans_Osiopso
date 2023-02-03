package com.cojeans.osiopso.entity.closet;

import com.cojeans.osiopso.dto.closet.SeasonDto;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@AllArgsConstructor @NoArgsConstructor
@Builder
@ToString
public class Season {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String seasonName;

    public SeasonDto toDto(){
        return SeasonDto.builder()
                .id(id)
                .seasonName(seasonName)
                .build();
    }
}
