package com.cojeans.osiopso.api.entity.closet;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter @Builder @NoArgsConstructor @AllArgsConstructor
public class Clothes {
    @Id @GeneratedValue
    private Long id;

    @Enumerated(EnumType.STRING)
    private Season season;


}
