package com.shopeasy.entity;

import jakarta.persistence.*;
import lombok.*;

// ===== Product Entity =====
// "products" table se map hoti hai
@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private double price;       // Price in rupees

    @Column(length = 1000)
    private String description;

    private String imageUrl;    // Product ki image ka URL

    private int stock;          // Kitna stock available hai
}
