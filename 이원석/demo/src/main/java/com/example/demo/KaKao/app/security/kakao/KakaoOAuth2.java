package com.example.demo.KaKao.app.security.kakao;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.json.*;

@Component
public class KakaoOAuth2 {

    public KakaoUserInfo getUserInfo(String authorizedCode) {
        // 1. 인가코드 to 액세스 토큰
        String accessToken = getAccessToken(authorizedCode);

        // 2. 변환된 엑세스 토큰을 파라미터로 getUserInfoByToken 를 호출
        KakaoUserInfo userInfo = getUserInfoByToken(accessToken);

        return userInfo;
    }

    private KakaoUserInfo getUserInfoByToken(String accessToken) {
        // 전달받은 엑세스 토큰으로 외부 API(유저의 정보)Z 요청을 할 것이다!

        // 1. HttpHeader 오브젝트 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);

        // 2. HttpHeader와 HttpBody를 하나의 오브젝트에 담기
        RestTemplate rt = new RestTemplate();
        HttpEntity<MultiValueMap<String, String>> kakaoProfileRequest = new HttpEntity<>(headers);

        // 3. Http 요청하기 - Post방식으로 - 그리고 response 변수의 응답 받음.
        ResponseEntity<String> response = rt.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.POST,
                kakaoProfileRequest,
                String.class
        );

        try {
            JSONObject body = new JSONObject(response.getBody());
            Long id = body.getLong("id");
            String email = body.getJSONObject("kakao_account").getString("email");
            String nickname = body.getJSONObject("properties").getString("nickname");

            return new KakaoUserInfo(id, email, nickname);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }


    private String getAccessToken(String authorizedCode) {
        // 1. HttpHeader 오브젝트 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // 2. HttpBody 오브젝트 생성
        MultiValueMap<String, String> param = new LinkedMultiValueMap<>();
        param.add("grant_type", "authorization_code");
        param.add("client_id", "ef14fb79403feb7ba433bb24121f7342");
        param.add("redirect_uri", "http://localhost:8080/login");
        param.add("code", authorizedCode);

        // 3. HttpHeader와 HttpBody를 하나의 오브젝트에 담기
        RestTemplate rt = new RestTemplate();
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest =
                new HttpEntity<>(param, headers);

        //4.  Http 요청하기 - Post방식으로 - 그리고 response 변수의 응답 받음.
        ResponseEntity<String> response = rt.exchange(
                "https://kauth.kakao.com/oauth/token",
                HttpMethod.POST,
                kakaoTokenRequest,
                String.class
        );

        try{
            // JSON -> 액세스 토큰 파싱
            String tokenJson = response.getBody();
            JSONObject rjson = new JSONObject(tokenJson);
            String accessToken = rjson.getString("access_token");

            return accessToken;

        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }
}
