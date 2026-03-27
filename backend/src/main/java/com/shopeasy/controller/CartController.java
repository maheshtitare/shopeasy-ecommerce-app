package com.shopeasy.controller;

import com.shopeasy.entity.Cart;
import com.shopeasy.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

// ===== Cart Controller =====
// Cart ke REST API endpoints
// Base URL: /api/cart
// Sabke liye JWT token zaroori hai
@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    // GET /api/cart
    // Logged-in user ke cart items laao
    // Principal = JWT filter ne jo email set ki thi woh yahan automatically aata hai
    @GetMapping
    public ResponseEntity<List<Cart>> getCart(Principal principal) {
        return ResponseEntity.ok(cartService.getCartItems(principal.getName()));
    }

    // POST /api/cart
    // Product cart me add karo
    // Body: { "productId": 1, "quantity": 2 }
    @PostMapping
    public ResponseEntity<Cart> addItem(@RequestBody Map<String, Integer> body,
                                        Principal principal) {
        Long productId = body.get("productId").longValue();
        int quantity   = body.getOrDefault("quantity", 1);
        return ResponseEntity.ok(cartService.addToCart(principal.getName(), productId, quantity));
    }

    // DELETE /api/cart/{cartItemId}
    // Cart se ek specific item hatao
    @DeleteMapping("/{cartItemId}")
    public ResponseEntity<String> removeItem(@PathVariable Long cartItemId) {
        cartService.removeItem(cartItemId);
        return ResponseEntity.ok("Item cart se remove ho gaya!");
    }
}
