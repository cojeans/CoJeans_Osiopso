package com.cojeans.osiopso.entity.closet;

import com.cojeans.osiopso.entity.user.User;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter @AllArgsConstructor @NoArgsConstructor
@Builder
@ToString
public class Closet {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Boolean isSelected;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;
}
