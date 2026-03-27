package com.shopeasy.repository;

import com.shopeasy.entity.Order;
import com.shopeasy.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    // Ek specific user ke saare orders
    List<Order> findByUser(User user);

    // Admin ke liye - latest order pehle aaye (ID descending)
    List<Order> findAllByOrderByIdDesc();
}
