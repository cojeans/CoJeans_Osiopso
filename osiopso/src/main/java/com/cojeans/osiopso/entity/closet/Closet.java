package com.cojeans.osiopso.entity.closet;

import com.cojeans.osiopso.dto.closet.ClosetDto;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter @AllArgsConstructor @NoArgsConstructor
@Builder
@ToString
public class Closet {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
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
