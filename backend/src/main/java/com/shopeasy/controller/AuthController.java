package com.shopeasy.controller;

import com.shopeasy.dto.LoginRequest;
import com.shopeasy.dto.RegisterRequest;
import com.shopeasy.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// ===== Auth Controller =====
// Register aur Login ke REST API endpoints
// Base URL: /api/auth
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    // POST /api/auth/register
    // Body: { "name": "Rahul", "email": "rahul@gmail.com", "password": "123456", "role": "USER" }
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        String message = authService.register(req);
        return ResponseEntity.ok(message);
    }

    // POST /api/auth/login
    // Body: { "email": "rahul@gmail.com", "password": "123456" }
    // Response: { "token": "eyJ...", "name": "Rahul", "role": "USER" }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        return ResponseEntity.ok(authService.login(req));
    }
}
