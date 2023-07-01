package com.map.app.main.user.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UserController {

    /**
     * 사용자 메인
     * @return
     */
    @GetMapping("/user/main")
    public String main() {
        return "/user/user";
    }
}
