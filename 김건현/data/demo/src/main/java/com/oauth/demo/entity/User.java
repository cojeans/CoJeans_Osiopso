package com.oauth.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue
    private Long id;
    private String email;
    private String nickname;
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    public String getRoleKey(){
        return this.role.getKey();
    }

    public User update(String nickname) {
        this.nickname = nickname;
        return this;
    }
}
