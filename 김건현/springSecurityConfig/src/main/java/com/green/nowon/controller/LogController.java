package com.green.nowon.controller;

import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LogController {

    @GetMapping("/sign/signin")
    public String login(){ return "sign/signin";}
}
