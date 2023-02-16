package com.example.demo.KaKao.app.service;

import com.example.demo.KaKao.app.repository.UserRepository;
import com.example.demo.KaKao.app.security.kakao.KakaoOAuth2;
import com.example.demo.KaKao.app.security.kakao.KakaoUserInfo;
import com.example.demo.KaKao.app.security.kakao.User;
import com.example.demo.KaKao.app.security.kakao.UserRole;
import com.example.demo.KaKao.app.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService, UserDetailsService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final KakaoOAuth2 kakaoOAuth2;
    private final AuthenticationManager authenticationManager;
    private static final String ADMIN_TOKEN = "AAABnv/xRVklrnYxKZ0aHgTBcXukeZygoC";


    public void kakaoLogin(String authorizedCode) {
        // 카카오 OAuth2 를 통해 카카오 사용자 정보 조회
        System.out.println(authorizedCode);

        KakaoUserInfo userInfo = kakaoOAuth2.getUserInfo(authorizedCode);
        Long kakaoId = userInfo.getId();
        String nickname = userInfo.getNickname();
        String email = userInfo.getEmail();

        // 우리 DB 에서 회원 Id 와 패스워드
        // 회원 Id = 카카오 nickname
        String username = nickname;
        // 패스워드 = 카카오 Id + ADMIN TOKEN
        String password = kakaoId + ADMIN_TOKEN;

        // DB 에 중복된 Kakao Id 가 있는지 확인
        User kakaoUser = userRepository.findByKakaoId(kakaoId).orElse(null);

        // 카카오 정보로 회원가입
        if (kakaoUser == null) {
            // 패스워드 인코딩
            String encodedPassword = passwordEncoder.encode(password);
            // ROLE = 사용자
            UserRole role = UserRole.USER;

            kakaoUser = new User(nickname, encodedPassword, email, role, kakaoId);
            System.out.println("SAVE!");
            userRepository.save(kakaoUser);
            System.out.println("AFTER SAVE!");
        }

        // 로그인 처리
        System.out.println("1");
        Authentication kakaoUsernamePassword = new UsernamePasswordAuthenticationToken(username, password);
        System.out.println("2");
        Authentication authentication = authenticationManager.authenticate(kakaoUsernamePassword);
        System.out.println("3");
        SecurityContextHolder.getContext().setAuthentication(authentication);
        System.out.println("SUCCESS LOGIN!");
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByUsername(username);

        if(user==null) {
            throw new UsernameNotFoundException(username);
        }
        return user.get();
    }
}