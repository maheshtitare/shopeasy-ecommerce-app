# ShopEasy - Scalable Full Stack E-Commerce Application

## Overview

ShopEasy is a full-stack e-commerce web application developed using React.js and Spring Boot. The application allows users to browse products, manage cart items, and place orders, while providing secure authentication using JWT.

## Key Highlights

* Implemented JWT-based authentication and authorization
* Designed RESTful APIs using Spring Boot
* Built responsive UI using React.js
* Followed layered architecture (Controller-Service-Repository)

## Tech Stack

* Frontend: React.js, Axios, React Router DOM
* Backend: Java, Spring Boot, Spring Security
* Authentication: JWT (JSON Web Token)
* Database: MySQL
* Tools: Git, GitHub, Postman

## Architecture Overview

Frontend (React.js) communicates with Backend (Spring Boot) using REST APIs.
JWT token is used for secure authentication and authorization.
Backend follows layered architecture:

* Controller → Handles API requests
* Service → Business logic
* Repository → Database interaction

## Project Structure

* backend/ : Spring Boot application
* frontend/ : React application
* database.sql : MySQL database setup script

## Features

* User registration and login with JWT authentication
* Product listing and management
* Add to cart and remove from cart
* Place orders and view order history
* Admin panel for managing products and orders

## How to Run

### 1. Setup Database

* Create MySQL database: `shopeasy_db`
* Run `database.sql` file

### 2. Run Backend

* Open backend folder in IDE
* Configure MySQL credentials in application.properties
* Run Spring Boot application
* Backend runs on: http://localhost:8080

### 3. Run Frontend

* Open frontend folder
* Run: npm install
* Run: npm start
* Frontend runs on: http://localhost:3000

## API Endpoints

### Auth

* POST /api/auth/register
* POST /api/auth/login

### Products

* GET /api/products
* GET /api/products/{id}
* POST /api/products (Admin)
* PUT /api/products/{id} (Admin)
* DELETE /api/products/{id} (Admin)

### Cart

* GET /api/cart
* POST /api/cart
* DELETE /api/cart/{id}

### Orders

* POST /api/orders/place
* GET /api/orders/my
* GET /api/orders/all (Admin)
* PUT /api/orders/{id}/status (Admin)

## Screenshots

(Add screenshots of Home Page, Cart Page, Admin Panel here)

## Author

Mahesh Suresh Titare
