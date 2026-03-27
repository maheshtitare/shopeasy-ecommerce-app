package com.shopeasy.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

// ===== JWT Utility Class =====
// Token generate karna, validate karna, aur data nikalna
@Component
public class JwtUtil {

    // Secret key - production me environment variable me rakhna chahiye
    // 256-bit se bada hona chahiye HMAC-SHA ke liye
    private static final String SECRET = "ShopEasySecretKeyForJWTTokenGenerationAndValidation2024!";

    // Token 24 ghante valid rahega (milliseconds me)
    private static final long EXPIRY_MS = 24 * 60 * 60 * 1000L;

    // Signing key banao secret string se
    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET.getBytes());
    }

    // ===== Token Generate Karo =====
    // Email aur role doge to JWT token milega
    public String generateToken(String email, String role) {
        return Jwts.builder()
                .setSubject(email)                   // token ka subject = email
                .claim("role", role)                 // role bhi embed karo
                .setIssuedAt(new Date())             // kab banaya
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRY_MS)) // kab expire
                .signWith(getSigningKey())
                .compact();
    }

    // ===== Token Se Email Nikalo =====
    public String getEmail(String token) {
        return parseClaims(token).getSubject();
    }

    // ===== Token Se Role Nikalo =====
    public String getRole(String token) {
        return (String) parseClaims(token).get("role");
    }

    // ===== Token Valid Hai Ya Nahi =====
    public boolean isValid(String token) {
        try {
            // Agar expire nahi hua to valid hai
            return parseClaims(token).getExpiration().after(new Date());
        } catch (ExpiredJwtException e) {
            System.out.println("Token expire ho gaya!");
            return false;
        } catch (Exception e) {
            System.out.println("Invalid token: " + e.getMessage());
            return false;
        }
    }

    // Private helper - token parse karke claims nikalo
    private Claims parseClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
