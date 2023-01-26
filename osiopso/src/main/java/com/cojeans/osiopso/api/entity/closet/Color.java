package com.cojeans.osiopso.api.entity.closet;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter @AllArgsConstructor @NoArgsConstructor
@Builder
public class Color {
    @Id @GeneratedValue
    private Long id;

    private String colorName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CLOTHES_ID")
    private Clothes clothes;
}
