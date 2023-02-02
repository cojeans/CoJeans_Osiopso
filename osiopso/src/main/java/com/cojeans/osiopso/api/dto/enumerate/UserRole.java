package com.cojeans.osiopso.api.dto.enumerate;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum UserRole {
    USER("ROLE_USER", "일반 사용자 권한"),
    ADMIN("ROLE_ADMIN", "관리자 권한"),
    NONE("NONE", "권한 없음");

    UserRole(String role_user, String s) {
    }
}