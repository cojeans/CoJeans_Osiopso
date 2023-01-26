package com.cojeans.osiopso.entity.closet;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
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
