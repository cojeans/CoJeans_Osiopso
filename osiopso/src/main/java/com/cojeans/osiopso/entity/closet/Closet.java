package com.cojeans.osiopso.entity.closet;

import com.cojeans.osiopso.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter @AllArgsConstructor @NoArgsConstructor
public class Closet {
    @Id @GeneratedValue
    private Long id;

    private String closetName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;


}
