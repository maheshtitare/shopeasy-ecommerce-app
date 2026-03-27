package com.shopeasy.controller;

import com.shopeasy.entity.Order;
import com.shopeasy.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

// ===== Order Controller =====
// Order ke REST API endpoints
// Base URL: /api/orders
@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    // POST /api/orders/place
    // Cart se order place karo - cart automatically clear ho jayega
    @PostMapping("/place")
    public ResponseEntity<Order> place(Principal principal) {
        return ResponseEntity.ok(orderService.placeOrder(principal.getName()));
    }

    // GET /api/orders/my
    // Logged-in user ke apne saare orders
    @GetMapping("/my")
    public ResponseEntity<List<Order>> myOrders(Principal principal) {
        return ResponseEntity.ok(orderService.getMyOrders(principal.getName()));
    }

    // GET /api/orders/all
    // Admin only - saare users ke orders dekhna
    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Order>> allOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    // PUT /api/orders/{id}/status
    // Admin only - order status update karo
    // Body: { "status": "SHIPPED" }
    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Order> updateStatus(@PathVariable Long id,
                                               @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(orderService.updateStatus(id, body.get("status")));
    }
}
