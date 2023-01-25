package com.green.nowon.security;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                //url 보안설정
                .authorizeRequests(authorize -> authorize
                        //윗줄에서 적용한 주소나 패턴이 우선적용됩니다.
                        .antMatchers("/css/**", "/js/**","/images/**").permitAll()//리소스경로 해줘야 적용됨.
                        .antMatchers("/").permitAll()   //인증없이 접속할 수 있는 페이지
                        .antMatchers("/admin/**").hasRole("ADMIN")//ADMIN 권한(ROLE_ADMIN)이 있는 인증
                        .anyRequest().authenticated()   //모든 요청주소에서 인증이 필요합니다 --> 로그인 페이지로.
                )
                //일반 로그인 설정
                .formLogin(form->form
                        .loginPage("/sign/signin")
                        .loginProcessingUrl("/sign/signin") //action
                        .usernameParameter("email")     //form 에서 인증ID name 설정값과 맞춰야함 default:username
                        .passwordParameter("pass")      //form 에서 인증PW name 설정값과 맞춰야함 default:password
                        .permitAll()
                )
                //소셜로그인 설정
                .oauth2Login(oauth2 ->oauth2
                        .loginPage("/sign/signin")
                        .defaultSuccessUrl("/",true)//인증성공하면 무조건 인덱스 페이지로
                        .permitAll()
                )
                .csrf(csrf->csrf.disable())   //명시되어 있지 않을경우 기본으로 csrf보안적용됨
        ;
        return http.build();
    }
}
