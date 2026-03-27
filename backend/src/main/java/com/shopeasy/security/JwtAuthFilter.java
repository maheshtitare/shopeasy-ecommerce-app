package com.shopeasy.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

// ===== JWT Auth Filter =====
// Har HTTP request ke pehle yeh filter chalega
// Authorization header me token check karega
// Valid token hai to user ko Spring Security me authenticate karega
@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        // Request header se Authorization value lo
        String authHeader = request.getHeader("Authorization");

        // Header hona chahiye aur "Bearer " se shuru hona chahiye
        if (authHeader != null && authHeader.startsWith("Bearer ")) {

            // "Bearer " = 7 characters, uske baad actual token hai
            String token = authHeader.substring(7);

            if (jwtUtil.isValid(token)) {
                String email = jwtUtil.getEmail(token);
                String role  = jwtUtil.getRole(token);

                // Spring Security ko batao ki yeh user logged in hai
                // "ROLE_" prefix Spring Security ka convention hai
                var authToken = new UsernamePasswordAuthenticationToken(
                        email,   // principal - Controller me Principal.getName() se milega
                        null,    // credentials - JWT me null rakhte hain
                        List.of(new SimpleGrantedAuthority("ROLE_" + role)) // ROLE_USER ya ROLE_ADMIN
                );

                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        // Agle filter ko request pass karo
        filterChain.doFilter(request, response);
    }
}
