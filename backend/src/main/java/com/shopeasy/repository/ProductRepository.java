package com.shopeasy.repository;

import com.shopeasy.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

// Spring Data JPA automatically CRUD methods de deta hai:
// findAll(), findById(), save(), deleteById() etc.
public interface ProductRepository extends JpaRepository<Product, Long> {
    // Koi custom query nahi chahiye abhi
}
