package com.cojeans.osiopso.dto.user;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
@AllArgsConstructor
public class MailContentBuilder {

    private final TemplateEngine templateEngine;

    public NotificationEmail build(NotificationEmail message) {
        Context context = new Context();
        context.setVariable("link", message);
        return templateEngine.process("mailTemplate", context);
    }
}

