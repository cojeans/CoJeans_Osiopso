package com.cojeans.osiopso.api.entity.closet;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Builder @NoArgsConstructor @AllArgsConstructor
public class Clothes {
    @Id @GeneratedValue
    private Long id;

    private String category;

    @OneToMany(mappedBy = "clothes")
    private List<Season> seasons;

    @OneToMany(mappedBy = "clothes")
    private List<Color> colors;

}
