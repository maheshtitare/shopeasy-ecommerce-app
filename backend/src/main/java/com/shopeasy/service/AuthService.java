package com.shopeasy.service;

import com.shopeasy.dto.LoginRequest;
import com.shopeasy.dto.RegisterRequest;
import com.shopeasy.entity.User;
import com.shopeasy.repository.UserRepository;
import com.shopeasy.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

// ===== Auth Service =====
// Register aur Login ka business logic yahan hai
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    // ===== Register =====
    // Naya user database me save karo
    public String register(RegisterRequest req) {

        // Pehle check karo - yeh email already registered to nahi hai
        if (userRepository.findByEmail(req.getEmail()).isPresent()) {
            throw new RuntimeException("Yeh email already registered hai! Dusri email use karo.");
        }

        // Naya User object banao
        User user = new User();
        user.setName(req.getName());
        user.setEmail(req.getEmail());
        user.setPassword(passwordEncoder.encode(req.getPassword())); // BCrypt se encrypt karo
        user.setRole(req.getRole() != null ? req.getRole().toUpperCase() : "USER"); // Default role = USER

        userRepository.save(user);
        return "Registration successful! Ab login karo.";
    }

    // ===== Login =====
    // Email + password verify karo, sab theek hai to JWT token do
    public Map<String, Object> login(LoginRequest req) {

        // Email se user dhundho
        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("User nahi mila! Pehle register karo."));

        // Password match karo (BCrypt se compare hoga internally)
        if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            throw new RuntimeException("Wrong password! Dobara try karo.");
        }

        // Sab theek hai - JWT token generate karo
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole());

        // Response me token + user info bhejo
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("name", user.getName());
        response.put("email", user.getEmail());
        response.put("role", user.getRole());
        response.put("message", "Login successful!");

        return response;
    }
}
