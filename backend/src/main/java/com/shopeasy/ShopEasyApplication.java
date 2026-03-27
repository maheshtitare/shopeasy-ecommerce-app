package com.shopeasy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// ===== ShopEasy Application Entry Point =====
// Yahan se Spring Boot app start hoti hai
@SpringBootApplication
public class ShopEasyApplication {

    public static void main(String[] args) {
        SpringApplication.run(ShopEasyApplication.class, args);
        System.out.println("===================================");
        System.out.println("  ShopEasy Backend is RUNNING! ✅ ");
        System.out.println("  URL: http://localhost:8080       ");
        System.out.println("===================================");
    }
}
