package com.cojeans.osiopso.api.entity.closet;

import lombok.*;

import javax.persistence.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class ClothPhoto {
    @Id
    @GeneratedValue
    private Long id;
    @Column(name = "origin_filename")
    private String originFilename;
    @Column(name = "store_filename")
    private String storeFilename;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CLOTHES_ID")
    private Clothes clothes;
}
