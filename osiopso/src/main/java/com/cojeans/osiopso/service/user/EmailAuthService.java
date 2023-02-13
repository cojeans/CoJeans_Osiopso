package com.cojeans.osiopso.service.user;


import com.cojeans.osiopso.dto.user.MailContentBuilder;
import com.cojeans.osiopso.dto.user.NotificationEmail;
import com.cojeans.osiopso.entity.user.User;
import com.cojeans.osiopso.entity.user.VerificationToken;
import com.cojeans.osiopso.exception.CustomMailException;
import com.cojeans.osiopso.repository.user.UserRepository;
import com.cojeans.osiopso.repository.user.VerificationTokenRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
@AllArgsConstructor
public class EmailAuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final VerificationTokenRepository verificationTokenRepository;
    private final MailContentBuilder mailContentBuilder;
    private final MailService mailService;

//    static String ACTIVATION_EMAIL = "http://localhost:8080/api/user/emailVerification/";
    static java.lang.String ACTIVATION_EMAIL = "https://www.osiopso.site/api/user/emailVerification/";
    static java.lang.String EMAIL_SUBJECT = "오시옵소 계정활성화를 해주세요";
    @Transactional
    public void sendVerificationEmail(java.lang.String userEmail) {
        java.lang.String token = generateVerificationToken(userEmail);
//        String link = Constants.ACTIVATION_EMAIL + "/" + token;
        java.lang.String link = ACTIVATION_EMAIL + token;
        java.lang.String mailContent = mailContentBuilder.build(link); //html파일로 링크에 변수 넣어서 만든다.
        log.info("link={} , token={}", link, token);

        mailService.sendMail(NotificationEmail
                .builder()
                .to(userEmail)
                .subject(EMAIL_SUBJECT)
                .body(mailContent)
                .build());
    }

    private java.lang.String generateVerificationToken(java.lang.String userEmail) {
        java.lang.String token = UUID.randomUUID().toString();
        VerificationToken verificationToken = new VerificationToken();
        verificationToken.setToken(token);
        verificationToken.setUserEmail(userEmail);
        verificationTokenRepository.save(verificationToken);
        return token;
    }

//    private String encodePassword(String password) {
//        return passwordEncoder.encode(password);
//    }

    public void verifyAccount(java.lang.String token) {
        log.info("verifyAccount ={}",token);
        Optional<VerificationToken> verificationTokenOptional = verificationTokenRepository.findOneByToken(token);
        verificationTokenOptional.orElseThrow(() -> new CustomMailException("잘못된 토큰입니다."));
        setUserEnabled(verificationTokenOptional.get());
    }

    @Transactional
    public void setUserEnabled(VerificationToken verificationToken) {
        java.lang.String email = verificationToken.getUserEmail();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new CustomMailException("유저를 찾을 수 없음 " + email));
        user.setEmailVerified(true);
        userRepository.save(user);
        log.info("setUserEnabled user ={}",user);
    }


}
