package com.cojeans.osiopso.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2 //swagger에 해당하는 어노테이션을 작성한다.
public class SwaggerConfig implements WebMvcConfigurer {

    //swagger 2.9.2 버전 리소스 등록
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) { //spring-security와 연결할 때 이 부분을 작성하지 않으면 404에러가 뜬다.
        registry.addResourceHandler("swagger-ui.html")
                .addResourceLocations("classpath:/META-INF/resources/");
        registry.addResourceHandler("/webjars/**")
                .addResourceLocations("classpath:/META-INF/resources/webjars/");
    }


    @Bean
    public Docket api() { //swagger를 연결하기 위한 Bean 작성
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.any())
                .paths(PathSelectors.any())
                .build()
                .pathMapping("/")
                .apiInfo(apiInfo());
    }

    private ApiInfo apiInfo() { //선택
        return new ApiInfoBuilder()
                .title("OSIOPSO:Cojeans") //자신에게 맞는 타이틀을 작성해준다.
                .description("backend api document") //알맞는 description을 작성해준다.
                .version("0.0") //알맞는 버전을 작성해준다.
                .build();
    }
}