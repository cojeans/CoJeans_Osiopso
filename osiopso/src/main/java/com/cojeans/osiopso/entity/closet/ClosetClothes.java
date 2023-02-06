package com.cojeans.osiopso.entity.closet;

import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
public class ClosetClothes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CLOSET_ID")
    private Closet closet;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CLOTHES_ID")
    private Clothes clothes;
}
