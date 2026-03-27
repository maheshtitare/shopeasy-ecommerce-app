package com.shopeasy.dto;

import lombok.Data;

// ===== Login Request DTO =====
// Login karne ke liye email aur password
@Data
public class LoginRequest {
    private String email;
    private String password;
}
