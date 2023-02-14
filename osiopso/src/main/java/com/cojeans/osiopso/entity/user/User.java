package com.cojeans.osiopso.entity.user;

import com.cojeans.osiopso.dto.user.UserDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;


@Entity
@AllArgsConstructor @NoArgsConstructor
@ToString @Getter @Setter @Builder
@Table(name = "user",uniqueConstraints = {@UniqueConstraint(columnNames = "email")})
@DynamicInsert @DynamicUpdate
public class User {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String email;
    @JsonIgnore @Column
    private String password;

    @Column(nullable = false)
    private String name;
    
    @Column(nullable = true)
    private int age;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(columnDefinition = "MEDIUMBLOB")
    private String imageUrl;

    @Column(nullable = false)
    private Boolean emailVerified = false;

    @Column
    @Enumerated(EnumType.STRING)
    private AuthProvider provider;
    @Column
    private String providerId;

    @Column
    private String bio=""; //자기소개 or 상태메세지

    @Column
    private Boolean isProfilePublic=true; //프로필 공개여부 기본값 true

    @Column @Enumerated(EnumType.STRING)
    private Role role; //역할. USER ADMIN 둘

    private Long grade;


    public UserDto toDto(){
        return UserDto.builder()
                .id(this.getId())
                .name(this.getName())
                .email(this.getEmail())
//                .password(this.getPassword())
                .age(this.getAge())
                .gender(this.getGender())
                .provider(this.getProvider())
                .providerId(this.getProviderId())
                .emailVerified(this.getEmailVerified())
                .bio(this.getBio())
                .role(this.getRole())
                .isProfilePublic(this.getIsProfilePublic())
                .build();
    }
    /* userPk값을 가져와서 업데이트 후 User객체 다시반환 -> toDto호출해서 Dto로 변환*/
    public void changeIsProfilePublic(){
        this.isProfilePublic = !this.isProfilePublic;
    }

    public void changePassword(String password){
        this.password = password;
    }





}
