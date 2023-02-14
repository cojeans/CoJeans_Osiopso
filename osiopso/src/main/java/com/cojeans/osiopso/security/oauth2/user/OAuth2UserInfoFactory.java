package com.cojeans.osiopso.security.oauth2.user;

import com.cojeans.osiopso.entity.user.AuthProvider;
import com.cojeans.osiopso.exception.OAuth2AuthenticationProcessingException;
import lombok.extern.slf4j.Slf4j;

import java.util.Map;
@Slf4j
public class OAuth2UserInfoFactory {

    public static OAuth2UserInfo getOAuth2UserInfo(String registrationId, Map<String, Object> attributes) {
        log.info("registrationId:{}",registrationId);
        if(registrationId.equalsIgnoreCase(AuthProvider.google.toString())) {
            return new GoogleOAuth2UserInfo(attributes);
        } else if (registrationId.equalsIgnoreCase(AuthProvider.facebook.toString())) {
            return new FacebookOAuth2UserInfo(attributes);
        } else if (registrationId.equalsIgnoreCase(AuthProvider.github.toString())) {
            return new com.example.springsocial.security.oauth2.user.GithubOAuth2UserInfo(attributes);
        } else if(registrationId.equalsIgnoreCase(AuthProvider.kakao.toString())){
            return new KakaoOAuth2UserInfo(attributes);
        }else {
            throw new OAuth2AuthenticationProcessingException("Sorry! Login with " + registrationId + " is not supported yet.");
        }
    }
}
