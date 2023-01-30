package com.oauth.demo.config;

import com.oauth.demo.service.MyOauth2UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private final MyOauth2UserService myOauth2UserService;

    public SecurityConfig(MyOauth2UserService myOauth2UserService) {
        this.myOauth2UserService = myOauth2UserService;
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .authorizeHttpRequests()

//                .anyRequest().permitAll()
//                .requestMatchers("/api/user").permitAll()
                .requestMatchers("/","api/user","/**").permitAll()
                .anyRequest().authenticated()
                .and()
                .oauth2Login().userInfoEndpoint().userService(myOauth2UserService);


        return http.build();
    }


}
