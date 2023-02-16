package com.cojeans.osiopso.service.user;


import com.cojeans.osiopso.dto.user.MailContentBuilder;
import com.cojeans.osiopso.dto.user.NotificationEmail;
import com.cojeans.osiopso.entity.user.AuthProvider;
import com.cojeans.osiopso.entity.user.User;
import com.cojeans.osiopso.entity.user.VerificationToken;
import com.cojeans.osiopso.exception.CustomMailException;
import com.cojeans.osiopso.repository.user.UserRepository;
import com.cojeans.osiopso.repository.user.VerificationTokenRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
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


    static String ACTIVATION_EMAIL = "http://localhost:8080/api/user/emailVerification/";
//    static String ACTIVATION_EMAIL = "https://www.osiopso.site/api/user/emailVerification/";
    static String EMAIL_SUBJECT = "오시옵소 계정활성화를 해주세요";
    static String PASSWORD_EMAIL_SUBJECT = "오시옵소 임시비밀번호";

    static int PASSWORD_SIZE = 10; //임시비밀번호 길이

    @Transactional
    public void sendPasswordEmail(String userEmail) {
        log.info("mailContent= {}", userEmail);

        /*랜덤 문자열을 만들고 해당 유저의 비밀번호를 변경하고 이메일로 임시비밀번호를 보내준다. */
        String passwordBeforeEncoded = RandomStringUtils.randomAlphanumeric(PASSWORD_SIZE);
        String encodedPassword = passwordEncoder.encode(passwordBeforeEncoded);
        userRepository.findByEmailAndProvider(userEmail, AuthProvider.local).get().setPassword(encodedPassword);
        String mailContent = mailContentBuilder.buildPasswordEmail(passwordBeforeEncoded); //html파일로 링크에 변수 넣어서 만든다.

        mailService.sendMail(NotificationEmail
                .builder()
                .to(userEmail)
                .subject(PASSWORD_EMAIL_SUBJECT)
                .body(mailContent)
                .build());
    }
    @Transactional
    public void sendVerificationEmail(String userEmail) {
        String token = generateVerificationToken(userEmail);
//        String link = Constants.ACTIVATION_EMAIL + "/" + token;
        String link = ACTIVATION_EMAIL + token;
        String mailContent = mailContentBuilder.build(link); //html파일로 링크에 변수 넣어서 만든다.
        log.info("link={} , token={}", link, token);

        mailService.sendMail(NotificationEmail
                .builder()
                .to(userEmail)
                .subject(EMAIL_SUBJECT)
                .body(mailContent)
                .build());
    }

    @Transactional
    private String generateVerificationToken(String userEmail) {
        String token = UUID.randomUUID().toString();
        VerificationToken verificationToken = new VerificationToken();
        verificationToken.setToken(token);
        verificationToken.setUserEmail(userEmail);
        verificationTokenRepository.save(verificationToken);
        return token;
    }

//    private String encodePassword(String password) {
//        return passwordEncoder.encode(password);
//    }

    public void verifyAccount(String token) {
        log.info("verifyAccount ={}",token);
        Optional<VerificationToken> verificationTokenOptional = verificationTokenRepository.findOneByToken(token);
        verificationTokenOptional.orElseThrow(() -> new CustomMailException("잘못된 토큰입니다."));
        setUserEnabled(verificationTokenOptional.get());
    }

    @Transactional
    public void setUserEnabled(VerificationToken verificationToken) {
        String email = verificationToken.getUserEmail();
        User user = userRepository.findByEmailAndProvider(email,AuthProvider.local).orElseThrow(() -> new CustomMailException("유저를 찾을 수 없음 " + email));
        user.setEmailVerified(true);
        userRepository.save(user);
        log.info("setUserEnabled user ={}",user);
    }


}
