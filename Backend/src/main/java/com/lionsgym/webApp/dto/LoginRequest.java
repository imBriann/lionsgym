package com.lionsgym.webApp.dto;
//Data Transfer Object

import lombok.Data; // Or add getters and setters manually

@Data // Lombok annotation for getters, setters, toString, etc.
public class LoginRequest {
    private String email;
    private String password;
}