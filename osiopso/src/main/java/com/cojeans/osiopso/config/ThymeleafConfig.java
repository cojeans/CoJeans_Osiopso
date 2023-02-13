package com.cojeans.osiopso.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.spring5.SpringTemplateEngine;
import org.thymeleaf.spring5.templateresolver.SpringResourceTemplateResolver;
import org.thymeleaf.templatemode.TemplateMode;

@Configuration
public class ThymeleafConfig {

    @Bean
    public TemplateEngine htmlTemplateEngine(SpringTemplateEngine templateEngine1) {
        TemplateEngine templateEngine = templateEngine1;
        templateEngine.addTemplateResolver(springResourceTemplateResolver());

        return templateEngine;
    }

    @Bean
    public SpringResourceTemplateResolver springResourceTemplateResolver() {
        SpringResourceTemplateResolver springResourceTemplateResolver = new SpringResourceTemplateResolver();
        springResourceTemplateResolver.setOrder(1);
        springResourceTemplateResolver.setPrefix("classpath:templates/");
        springResourceTemplateResolver.setSuffix(".html");
        springResourceTemplateResolver.setTemplateMode(TemplateMode.HTML);
        springResourceTemplateResolver.setCharacterEncoding("UTF-8");
        springResourceTemplateResolver.setCacheable(false);

        return springResourceTemplateResolver;
    }
}
