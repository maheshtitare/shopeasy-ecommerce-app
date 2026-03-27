package com.shopeasy.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

// ===== Order Entity =====
// "orders" table (order SQL reserved keyword hai, isliye orders rakha)
@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private double totalPrice;

    // Order ka status: PLACED -> SHIPPED -> DELIVERED
    private String status;

    private LocalDateTime orderDate;
}
