package com.cojeans.osiopso.entity.user;

import lombok.*;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Builder
@Setter
public class VerificationToken {
    @Id @GeneratedValue
    private Long id;
    @Column
    private String token;
    @Column
    private String userEmail;
}
