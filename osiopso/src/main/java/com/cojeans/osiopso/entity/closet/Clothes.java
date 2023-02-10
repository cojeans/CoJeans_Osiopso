package com.cojeans.osiopso.entity.closet;

import com.cojeans.osiopso.entity.user.User;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter @Builder @NoArgsConstructor @AllArgsConstructor
@ToString
public class Clothes {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String category;

//  private String url;

    private String url;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;
}
