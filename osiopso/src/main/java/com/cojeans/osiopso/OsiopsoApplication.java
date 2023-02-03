package com.cojeans.osiopso;

import com.cojeans.osiopso.config.AppProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@EnableConfigurationProperties(AppProperties.class)
@SpringBootApplication
public class OsiopsoApplication {

    public static void main(String[] args) {
        SpringApplication.run(OsiopsoApplication.class, args);
    }

}
