package com.shopeasy.dto;

import lombok.Data;

// ===== Register Request DTO =====
// Frontend se register karne ka data yahan aayega
@Data
public class RegisterRequest {
    private String name;
    private String email;
    private String password;
    private String role; // Optional - default USER hoga
}
