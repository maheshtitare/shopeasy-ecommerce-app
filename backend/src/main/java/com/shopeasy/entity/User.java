package com.shopeasy.entity;

import jakarta.persistence.*;
import lombok.*;

// ===== User Entity =====
// Yeh class database ki "users" table se map hoti hai
@Entity
@Table(name = "users")
@Data               // Lombok: getter + setter + toString ban jayenge automatically
@NoArgsConstructor  // Empty constructor
@AllArgsConstructor // Sab fields wala constructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto increment
    private Long id;

    private String name;

    @Column(unique = true, nullable = false)
    private String email;   // Email duplicate nahi hogi

    @Column(nullable = false)
    private String password; // BCrypt encrypted password save hogi

    private String role;    // "USER" ya "ADMIN"
}
