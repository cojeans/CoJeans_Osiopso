package com.cojeans.osiopso.security;

import com.cojeans.osiopso.entity.user.Gender;
import com.cojeans.osiopso.entity.user.AuthProvider;
import com.cojeans.osiopso.entity.user.Role;
import com.cojeans.osiopso.entity.user.User;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
/*정보 조회시 userDetail에 있는 id로 userRepository에서 객체 가져와서 저장할 것.*/
public class UserDetail implements OAuth2User, UserDetails {
    private Long id;
    private String email;
    private String password;
    private String name;
    private int age;
    private Gender gender;
    private String imageUrl;
    private Boolean emailVerified;
    private String bio;
    private Boolean isProfilePublic;
    private AuthProvider provider;
    private String providerId;
    private Collection<? extends GrantedAuthority> authorities;
    private Map<String, Object> attributes;
    private Role role;

    public UserDetail(Long id, String email, String name, String password,int age, Gender gender,AuthProvider provider, Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.age = age;
        this.provider = provider;
        this.gender = gender;
        this.authorities = authorities;
    }

    public static UserDetail create(User user) {
        List<GrantedAuthority> authorities = Collections.
                singletonList(new SimpleGrantedAuthority(Role.USER.getKey())); //기본적으로 USER의 권한주기

        return UserDetail.builder()
                .id(user.getId())
                .email(user.getEmail())
                .password(user.getPassword())
                .name(user.getName())
                .age(user.getAge())
                .gender(user.getGender())
                .authorities(authorities)
                .provider(user.getProvider())
                .role(Role.USER)
                .build();
    }

    public static UserDetail create(User user, Map<String, Object> attributes) {
        UserDetail userDetail = UserDetail.create(user);
        userDetail.setAttributes(attributes);
        return userDetail;
    }


    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    public void setAttributes(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    @Override
    public String getName() {
        return String.valueOf(id);
    }


}
