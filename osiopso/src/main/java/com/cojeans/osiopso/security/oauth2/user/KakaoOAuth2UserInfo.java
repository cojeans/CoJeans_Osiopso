package com.cojeans.osiopso.security.oauth2.user;


import java.util.Map;

public class KakaoOAuth2UserInfo extends OAuth2UserInfo{
    Map<String, Object> kakao_account;
    Map<String, Object> profile;
    public KakaoOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
        kakao_account = (Map<String, Object>) attributes.get("kakao_account");
        profile = (Map<String, Object>) kakao_account.get("profile");
    }

    //kakao는 provider id따로 없으니
    @Override
    public String getId() {
        return String.valueOf(attributes.get("id"));
    }

    @Override
    public String getName() {
        return (String) profile.get("nickname");
    }

    @Override
    public String getEmail() {
        return (String) kakao_account.get("email");
    }

    @Override
    public String getImageUrl() {
        return (String) profile.get("thumbnail_image_url");
    }
}
