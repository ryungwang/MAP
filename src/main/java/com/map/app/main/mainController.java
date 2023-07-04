package com.map.app.main;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class mainController {

    /**
     * 사용자 메인
     * @return
     */
    @GetMapping("/main")
    public String main() {
        return "/index";
    }
}
