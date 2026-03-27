package com.shopeasy.service;

import com.shopeasy.entity.Product;
import com.shopeasy.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

// ===== Product Service =====
// Product CRUD operations ka business logic
@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    // Saare products fetch karo - home page pe dikhane ke liye
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Single product ID se dhundho
    public Product getById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product nahi mila! ID: " + id));
    }

    // Naya product add karo - Admin only
    public Product addProduct(Product product) {
        // Basic validation
        if (product.getName() == null || product.getName().trim().isEmpty()) {
            throw new RuntimeException("Product name khali nahi ho sakta!");
        }
        if (product.getPrice() <= 0) {
            throw new RuntimeException("Price 0 se bada hona chahiye!");
        }
        return productRepository.save(product);
    }

    // Product update karo - Admin only
    public Product updateProduct(Long id, Product updatedData) {
        // Pehle existing product dhundho
        Product existing = getById(id);

        // Fields update karo
        existing.setName(updatedData.getName());
        existing.setPrice(updatedData.getPrice());
        existing.setDescription(updatedData.getDescription());
        existing.setImageUrl(updatedData.getImageUrl());
        existing.setStock(updatedData.getStock());

        return productRepository.save(existing);
    }

    // Product delete karo - Admin only
    public void deleteProduct(Long id) {
        getById(id); // Pehle check karo ki product exist karta hai
        productRepository.deleteById(id);
    }
}
