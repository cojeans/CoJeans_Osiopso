package com.cojeans.osiopso.api.dto.client;

import org.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Component
public class KakaoOAuth2 {
    public KakaoUserInfo getUserInfo(String authorizedCode) {
        // 1. 인가코드 -> 액세스 토큰
        String accessToken = getAccessToken(authorizedCode);
        // 2. 액세스 토큰 -> 카카오 사용자 정보
        KakaoUserInfo userInfo = getUserInfoByToken(accessToken);

        return userInfo;
    }

    private String getAccessToken(String authorizedCode) {
        // HttpHeader 오브젝트 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // HttpBody 오브젝트 생성
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", "ef14fb79403feb7ba433bb24121f7342");
        params.add("redirect_uri", "http://localhost:8080/user/kakao/callback");
        params.add("code", authorizedCode);

        // HttpHeader와 HttpBody를 하나의 오브젝트에 담기
        RestTemplate rt = new RestTemplate();
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest =
                new HttpEntity<>(params, headers);

        System.out.println(rt.toString());
        // Http 요청하기 - Post방식으로 - 그리고 response 변수의 응답 받음.
        ResponseEntity<String> response = rt.exchange(
                "https://kauth.kakao.com/oauth/token",
                HttpMethod.POST,
                kakaoTokenRequest,
                String.class
        );

        try {
            // JSON -> 액세스 토큰 파싱
            String tokenJson = response.getBody();
            System.out.println("======TokenJson=======");
            System.out.println(tokenJson);
            System.out.println("======================");
            JSONObject rjson = new JSONObject(tokenJson);
            String accessToken = rjson.getString("access_token");
//            String refresh_token = rjson.getString("refresh_token");

            System.out.println(accessToken);
            return accessToken;
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    private String getRefreshToken(String authorizedCode) {
        // HttpHeader 오브젝트 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // HttpBody 오브젝트 생성
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", "ef14fb79403feb7ba433bb24121f7342");
        params.add("redirect_uri", "http://localhost:8080/user/kakao/callback");
        params.add("code", authorizedCode);

        // HttpHeader와 HttpBody를 하나의 오브젝트에 담기
        RestTemplate rt = new RestTemplate();
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest =
                new HttpEntity<>(params, headers);

        System.out.println(rt.toString());
        // Http 요청하기 - Post방식으로 - 그리고 response 변수의 응답 받음.
        ResponseEntity<String> response = rt.exchange(
                "https://kauth.kakao.com/oauth/token",
                HttpMethod.POST,
                kakaoTokenRequest,
                String.class
        );

        try {
            // JSON -> 액세스 토큰 파싱
            String tokenJson = response.getBody();
            System.out.println("======TokenJson=======");
            System.out.println(tokenJson);
            System.out.println("======================");
            JSONObject rjson = new JSONObject(tokenJson);

//            String accessToken = rjson.getString("access_token");
            String refresh_token = rjson.getString("refresh_token");
            System.out.println(refresh_token);
            return refresh_token;
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }




    private KakaoUserInfo getUserInfoByToken(String accessToken) {
        // HttpHeader 오브젝트 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // HttpHeader와 HttpBody를 하나의 오브젝트에 담기
        RestTemplate rt = new RestTemplate();
        HttpEntity<MultiValueMap<String, String>> kakaoProfileRequest = new HttpEntity<>(headers);

        // Http 요청하기 - Post방식으로 - 그리고 response 변수의 응답 받음.
        ResponseEntity<String> response = rt.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.POST,
                kakaoProfileRequest,
                String.class
        );


        try {
            JSONObject body = new JSONObject(response.getBody());
            Long id = body.getLong("id");
            System.out.println(body.toString());
            String email = body.getJSONObject("kakao_account").getString("email");
            String nickname = body.getJSONObject("properties").getString("nickname");
            System.out.println(id + ", " + email + ", " + nickname);
            return new KakaoUserInfo(id, email, nickname);
        } catch(Exception e) {
            e.printStackTrace();
        }


        return null;
    }
}