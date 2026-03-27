package com.shopeasy.repository;

import com.shopeasy.entity.Cart;
import com.shopeasy.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {

    // Ek user ke saare cart items dhundho
    List<Cart> findByUser(User user);

    // Check karo ki user ke cart me yeh product already hai ya nahi
    // (duplicate add hone se bachao)
    Optional<Cart> findByUserAndProduct_Id(User user, Long productId);

    // Order place hone ke baad pura cart delete karo
    void deleteByUser(User user);
}
