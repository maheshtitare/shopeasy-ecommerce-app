-- ============================================
-- ShopEasy E-Commerce - Database Setup
-- MySQL 8.x
-- ============================================

-- Step 1: Database banao
CREATE DATABASE IF NOT EXISTS shopeasy_db;
USE shopeasy_db;

-- ============================================
-- Step 2: Tables banao
-- (Spring Boot JPA bhi automatically banayega
--  but yeh script manual setup ke liye hai)
-- ============================================

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id       BIGINT AUTO_INCREMENT PRIMARY KEY,
    name     VARCHAR(100)        NOT NULL,
    email    VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255)        NOT NULL,
    role     VARCHAR(20)         NOT NULL DEFAULT 'USER'
);

-- Products Table
CREATE TABLE IF NOT EXISTS products (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(200)  NOT NULL,
    price       DOUBLE        NOT NULL,
    description VARCHAR(1000),
    image_url   VARCHAR(500),
    stock       INT           NOT NULL DEFAULT 0
);

-- Cart Table
CREATE TABLE IF NOT EXISTS cart (
    id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id    BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity   INT    NOT NULL DEFAULT 1,
    FOREIGN KEY (user_id)    REFERENCES users(id)    ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Orders Table
-- Note: "order" SQL me reserved keyword hai isliye table name "orders" rakha
CREATE TABLE IF NOT EXISTS orders (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id     BIGINT      NOT NULL,
    total_price DOUBLE      NOT NULL,
    status      VARCHAR(50) NOT NULL DEFAULT 'PLACED',
    order_date  DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ============================================
-- Step 3: Sample Data
-- ============================================

-- Sample Admin User
-- Password = "password" (BCrypt hash)
INSERT IGNORE INTO users (name, email, password, role) VALUES
('Admin User', 'admin@shopeasy.com',
 '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
 'ADMIN');

-- Sample Normal User
-- Password = "password" (BCrypt hash)
INSERT IGNORE INTO users (name, email, password, role) VALUES
('Rahul Sharma', 'rahul@gmail.com',
 '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
 'USER');

-- Sample Products
INSERT IGNORE INTO products (name, price, description, image_url, stock) VALUES
('iPhone 15',
 79999,
 'Apple iPhone 15 with A16 chip, 48MP camera, USB-C charging.',
 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
 25),

('Samsung Galaxy S24',
 74999,
 'Samsung Galaxy S24 with Snapdragon 8 Gen 3, 50MP camera, 6.2 inch display.',
 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400',
 30),

('Sony WH-1000XM5 Headphones',
 24999,
 'Industry-leading noise cancelling wireless headphones with 30hr battery life.',
 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
 50),

('Dell Inspiron 15 Laptop',
 65000,
 'Intel i5 13th Gen, 16GB RAM, 512GB SSD. Perfect for students and professionals.',
 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
 15),

('Nike Air Max 270',
 8999,
 'Lightweight and comfortable Nike Air Max 270 running shoes.',
 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
 100),

('boAt Airdopes 141',
 1299,
 'TWS earbuds with 42H total playback, ENx noise cancellation, IPX4 water resistant.',
 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400',
 200);

-- ============================================
-- Verify data
-- ============================================
SELECT 'Users count:'    AS label, COUNT(*) AS total FROM users;
SELECT 'Products count:' AS label, COUNT(*) AS total FROM products;

-- ============================================
-- NOTE:
-- Sample users ka password = "password"
-- BCrypt hash: $2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi
--
-- Login credentials:
--   Admin: admin@shopeasy.com / password
--   User:  rahul@gmail.com    / password
-- ============================================
