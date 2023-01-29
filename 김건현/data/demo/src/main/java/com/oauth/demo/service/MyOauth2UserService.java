package com.oauth.demo.service;

import com.oauth.demo.dto.OauthAttributes;
import com.oauth.demo.entity.User;
import com.oauth.demo.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;

/**
 * OAuth2UserService의 구현체. OAuth2UserRequest-> OAuth2User
 * loadUser() 구현한다.
 */
@Service
public class MyOauth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
    private final UserRepository userRepository;
    private final HttpSession httpSession;

    public MyOauth2UserService(UserRepository userRepository, HttpSession httpSession) {
        this.userRepository = userRepository;
        this.httpSession = httpSession;
    }

    /**
     *
     * @param userRequest the user request
     * @return
     * @throws OAuth2AuthenticationException
     * 요청이 오면 OAuth2UserRequest를 파라미터로 받아서 loadUser메서드를 구현한다.
     */
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        System.out.println("GET IN MyOauth2UserService");
        OAuth2UserService<OAuth2UserRequest,OAuth2User> delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        String userNameAttribute =  userRequest.getClientRegistration()
                .getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();

        OauthAttributes attributes = OauthAttributes.of(registrationId, userNameAttribute, oAuth2User.getAttributes());
        User user = saveOrUpdate(attributes);
        httpSession.setAttribute("user", user);


        System.out.println("attributes: "+attributes);
        System.out.println("=================================");
        System.out.println("registrationId: "+registrationId);
        System.out.println("=================================");
        System.out.println("userNameAttribute: "+userNameAttribute);
        System.out.println("=================================");
        System.out.println("Oauth2User: "+oAuth2User); //찍어보기
        System.out.println("=================================");

        return new DefaultOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority(user.getRoleKey())),
                attributes.getAttributes(),
                attributes.getNameAttributeKey()
        );
    }

    private User saveOrUpdate(OauthAttributes attributes) {
        User user = userRepository.findByEmail(attributes.getEmail())
                .map(entity -> entity.update(attributes.getName()))
                .orElse(attributes.toEntity());

        return userRepository.save(user);
    }
}
