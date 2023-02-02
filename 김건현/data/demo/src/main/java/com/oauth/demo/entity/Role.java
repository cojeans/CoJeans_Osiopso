package com.oauth.demo.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Role {
    ROLE_USER("ROLE_USER","유저"),ROLE_ADMIN("ROLE_ADMIN","관리자");
    private final String key;
    private final String title;

}
