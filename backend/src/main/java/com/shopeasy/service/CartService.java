package com.shopeasy.service;

import com.shopeasy.entity.Cart;
import com.shopeasy.entity.Product;
import com.shopeasy.entity.User;
import com.shopeasy.repository.CartRepository;
import com.shopeasy.repository.ProductRepository;
import com.shopeasy.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

// ===== Cart Service =====
// Cart ke saare operations: add, remove, view, clear
@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    // User ke saare cart items laao
    public List<Cart> getCartItems(String email) {
        User user = findUserByEmail(email);
        return cartRepository.findByUser(user);
    }

    // Product cart me add karo
    public Cart addToCart(String email, Long productId, int quantity) {
        User user = findUserByEmail(email);

        // Product exist karta hai?
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product nahi mila!"));

        // Agar yeh product pehle se cart me hai...
        Optional<Cart> existingItem = cartRepository.findByUserAndProduct_Id(user, productId);
        if (existingItem.isPresent()) {
            // ...to sirf quantity badhao, naya item mat banao
            Cart item = existingItem.get();
            item.setQuantity(item.getQuantity() + quantity);
            return cartRepository.save(item);
        }

        // Naya cart item banao aur save karo
        Cart newItem = new Cart();
        newItem.setUser(user);
        newItem.setProduct(product);
        newItem.setQuantity(quantity);
        return cartRepository.save(newItem);
    }

    // Cart se ek item remove karo
    public void removeItem(Long cartItemId) {
        if (!cartRepository.existsById(cartItemId)) {
            throw new RuntimeException("Cart item nahi mila ID: " + cartItemId);
        }
        cartRepository.deleteById(cartItemId);
    }

    // Pura cart clear karo - order place hone ke baad
    @Transactional
    public void clearCart(String email) {
        User user = findUserByEmail(email);
        cartRepository.deleteByUser(user);
    }

    // Helper method - email se user object nikalo
    private User findUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User nahi mila: " + email));
    }
}
