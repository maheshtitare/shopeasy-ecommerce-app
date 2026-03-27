package com.shopeasy.config;

import com.shopeasy.security.JwtAuthFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

// ===== Spring Security Configuration =====
// Yahan decide hota hai kaun sa endpoint open hai, kaun sa protected
@Configuration
@EnableWebSecurity
@EnableMethodSecurity   // @PreAuthorize annotation use karne ke liye (Admin endpoints pe)
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
            // REST API me CSRF nahi chahiye (cookies use nahi hote)
            .csrf(csrf -> csrf.disable())

            // CORS enable karo - React frontend (port 3000) se requests allow karne ke liye
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))

            // Session stateless - hum JWT use kar rahe hain, server-side session nahi
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

            // Endpoints ki permissions define karo
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()               // Register + Login - sabke liye open
                .requestMatchers("/api/products", "/api/products/**").permitAll() // Products dekhna - sabke liye
                .anyRequest().authenticated()                              // Baaki sab ke liye JWT token zaroori
            )

            // JWT filter ko default filter ke pehle add karo
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // BCrypt password encoder bean
    // Password securely hash karta hai - plain text kabhi store nahi hoti
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // CORS Configuration
    // React frontend localhost:3000 se backend localhost:8080 pe requests allow karo
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:3000"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
