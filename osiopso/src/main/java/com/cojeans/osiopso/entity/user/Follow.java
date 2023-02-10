package com.cojeans.osiopso.entity.user;

import lombok.*;

import javax.persistence.*;

@Entity
@AllArgsConstructor @NoArgsConstructor
@ToString
@Getter
@Builder
public class Follow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "FOLLOWING_ID")
    private User following;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "FOLLOWER_ID")
    private User follower;
}
