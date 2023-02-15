package com.cojeans.osiopso.dto.user;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * 현재는 이름만. 나중에 추가필드 넣어주기.
 */
@Getter @Setter @Builder @ToString
public class EditUserDto {
    private String name;


}
