package com.cojeans.osiopso.service.user;

import com.cojeans.osiopso.dto.user.NotificationEmail;
import com.cojeans.osiopso.exception.CustomMailException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@AllArgsConstructor
public class MailService {
    private final JavaMailSender mailSender;

    @Async
    void sendMail(NotificationEmail notificationEmail) {
        log.info(mailSender.toString());
        MimeMessagePreparator messagePreparator = mimeMessage -> {
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            messageHelper.setFrom("wearecojeans@gmaill.com");
            messageHelper.setTo(notificationEmail.getTo());
            messageHelper.setSubject(notificationEmail.getSubject());
            messageHelper.setText(notificationEmail.getBody(), true);
        };

        try {
            mailSender.send(messagePreparator);
            log.info("활성화 메일이 보내졌다 to: {}",notificationEmail);
        } catch (MailException e) {
            log.error(String.valueOf(e));
            throw new CustomMailException("메일을 여기로 보내는 중 에러 발생 :  " + notificationEmail.getTo());
        }
    }
}
