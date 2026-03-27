package com.shopeasy.repository;

import com.shopeasy.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

// ===== User Repository =====
// Spring Data JPA automatically CRUD queries provide karta hai
// Hume sirf custom queries likhni hoti hain
public interface UserRepository extends JpaRepository<User, Long> {

    // Email se user dhundho - login ke liye zaroori hai
    Optional<User> findByEmail(String email);
}
