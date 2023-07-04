package com.map.app.main.map.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MapController {

    /**
     * 세계
     * @return
     */
    @GetMapping("/map/earth")
    public String earth() {
        return "/map/earth";
    }

    /**
     * 한국
     * @return
     */
    @GetMapping("/map/south_korea")
    public String korea() {
        return "/map/south_korea";
    }
}
