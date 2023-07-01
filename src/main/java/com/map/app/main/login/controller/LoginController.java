package com.map.app.main.login.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LoginController {

    /**
     * 로그인 결과 페이지
     */
    @GetMapping("/loginSuccess")
    public String loginSuccess() {
        return "/common/loginSuccess";
    }

    /**
     * 로그아웃 결과 페이지
     */
    @GetMapping("/logOutSuccess")
    public String logOutSuccess() {
        return "/common/logOutSuccess";
    }

    /**
     * 회원가입 페이지
     * @return
     */
    @GetMapping("/signUp")
    public String signup() {
        return "/common/signUp";
    }

    /**
     * 접근 거부 페이지
     * @return
     */
    @GetMapping("/common/accessDenied")
    public String accessDenied() {
        return "/common/accessDenied";
    }
}
