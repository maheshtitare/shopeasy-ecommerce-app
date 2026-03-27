package com.shopeasy.service;

import com.shopeasy.entity.Cart;
import com.shopeasy.entity.Order;
import com.shopeasy.entity.User;
import com.shopeasy.repository.CartRepository;
import com.shopeasy.repository.OrderRepository;
import com.shopeasy.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

// ===== Order Service =====
// Order place karna aur orders dekhna
@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final CartRepository cartRepository;

    // ===== Order Place Karo =====
    // Cart se items uthao -> total calculate karo -> order save karo -> cart clear karo
    @Transactional  // Agar beech me error aaye to rollback ho
    public Order placeOrder(String email) {

        // Step 1: User dhundho
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User nahi mila!"));

        // Step 2: User ka cart laao
        List<Cart> cartItems = cartRepository.findByUser(user);

        // Cart khali hai to order nahi hoga
        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart khali hai! Pehle kuch add karo.");
        }

        // Step 3: Total price calculate karo (price * quantity ka sum)
        double totalPrice = 0;
        for (Cart item : cartItems) {
            totalPrice += item.getProduct().getPrice() * item.getQuantity();
        }

        // Step 4: Order object banao
        Order order = new Order();
        order.setUser(user);
        order.setTotalPrice(totalPrice);
        order.setStatus("PLACED");               // Pehli status = PLACED
        order.setOrderDate(LocalDateTime.now()); // Current time

        // Step 5: Order save karo
        Order savedOrder = orderRepository.save(order);

        // Step 6: Cart clear karo - order ho gaya!
        cartRepository.deleteByUser(user);

        return savedOrder;
    }

    // Logged-in user ke apne orders
    public List<Order> getMyOrders(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User nahi mila!"));
        return orderRepository.findByUser(user);
    }

    // Admin: Saare users ke orders (latest pehle)
    public List<Order> getAllOrders() {
        return orderRepository.findAllByOrderByIdDesc();
    }

    // Admin: Order status update karo (PLACED -> SHIPPED -> DELIVERED)
    public Order updateStatus(Long orderId, String newStatus) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order nahi mila! ID: " + orderId));
        order.setStatus(newStatus.toUpperCase());
        return orderRepository.save(order);
    }
}
