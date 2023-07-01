package com.map.app.main.admin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AdminController {

    /**
     * 관리자 페이지
     * @return
     */
    @GetMapping("/admin")
    public String adminPage() {
        return "/admin/admin";
    }

}
