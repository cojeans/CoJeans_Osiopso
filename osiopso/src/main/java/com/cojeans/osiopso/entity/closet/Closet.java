package com.cojeans.osiopso.entity.closet;

import com.cojeans.osiopso.dto.closet.ClosetClothesDto;
import com.cojeans.osiopso.dto.closet.ClosetDto;
import com.cojeans.osiopso.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Getter @AllArgsConstructor @NoArgsConstructor
@Builder
public class Closet {
    @Id @GeneratedValue
    private Long id;

    private String closetName;

    private String email; // 임시로 유저 이메일을 받습니다.

    private Boolean isSelected;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "USER_ID")
//    private User user;

    public ClosetDto toDto(){
        return ClosetDto.builder()
                        .id(id)
                        .closetName(closetName)
                        .email(email)
                        .isSelected(isSelected)
                        .build();
    }
}
