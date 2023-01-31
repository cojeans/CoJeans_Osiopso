package com.oauth.demo.config.jwt;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

/**
 * 토큰을 헤더에서 가져오고, JwtTokenProvider에 토큰을 보내서
 * 유효성 테스트를 하고 통과하면 토큰에서 Authentication을 가져온다.
 * 이후 Authentication을 SecurityContextHoler에 저장.
 */
public class JwtAuthenticationFilter extends GenericFilterBean {

    private final JwtTokenProvider jwtTokenProvider;

    public JwtAuthenticationFilter(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    /**
     * 요청헤더에서 토큰을 추출하고, null체크와 유효성체크를 한다. 통과하면 토큰에서 Authentication을 가져온다.
     * 이후 Authentication을 SecurityContextHoler에 저장.
     *
     * @param request  The request to process
     * @param response The response associated with the request
     * @param chain    Provides access to the next filter in the chain for this
     *                 filter to pass the request and response to for further
     *                 processing
     *
     * @throws IOException
     * @throws ServletException
     */
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        String token = resolveToken((HttpServletRequest) request);

        // 토큰 유효성 검사
        if (token!=null && jwtTokenProvider.validateToken(token)) {
            Authentication authentication = jwtTokenProvider.getAuthentication(token);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        chain.doFilter(request, response);
    }

    /**
     * 요청 헤더에서 토큰을 추출
     * @param request
     * @return
     */
    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization"); //요청헤더에서 Authorization을 가져온다.
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer")) { //BearerToken 형식이면 "Bearer "를 없애고 리턴
            return bearerToken.substring(7);
        }
        return null;
    }
}
