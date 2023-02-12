package com.cojeans.osiopso.entity.user;

import com.cojeans.osiopso.dto.user.Gender;
import com.cojeans.osiopso.dto.user.UserDto;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;


@Entity
@AllArgsConstructor @NoArgsConstructor
@ToString
@Getter
@Builder
@Table(name = "user",uniqueConstraints = {@UniqueConstraint(columnNames = "email")})
@DynamicInsert @DynamicUpdate
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(nullable = true)
    private int age;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private String imageUrl;

    @Column(nullable = false)
    private Boolean emailVerified = false;

//    @JsonIgnore //나중에 실서비스할때는 주석해재
    @Column
    private String password;

    @Enumerated(EnumType.STRING)
    private AuthProvider provider;

    private String providerId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Boolean getEmailVerified() {
        return emailVerified;
    }

    public void setEmailVerified(Boolean emailVerified) {
        this.emailVerified = emailVerified;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public AuthProvider getProvider() {
        return provider;
    }

    public void setProvider(AuthProvider provider) {
        this.provider = provider;
    }

    public String getProviderId() {
        return providerId;
    }

    public void setProviderId(String providerId) {
        this.providerId = providerId;
    }

    public UserDto toDto(){
        return UserDto.builder()
                .id(this.getId())
                .name(this.getName())
                .email(this.getEmail())
//                .password(this.getPassword())
                .age(this.getAge())
                .gender(this.getGender())
                .provider(this.getProvider())
                .emailVerified(this.getEmailVerified())
                .build();
    }

}
