import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import AdminPanel from "./pages/AdminPanel";
import "./App.css";

// ===== Protected Route =====
// Agar user logged in nahi hai to login page pe bhejo
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

// ===== Admin Route =====
// Sirf ADMIN role wala admin panel access kar sakta hai
function AdminRoute({ children }) {
  const token = localStorage.getItem("token");
  const role  = localStorage.getItem("role");
  if (!token) return <Navigate to="/login" replace />;
  if (role !== "ADMIN") return <Navigate to="/" replace />;
  return children;
}

// ===== Main App Component =====
function App() {
  return (
    <Router>
      {/* Navbar har page pe dikhega */}
      <Navbar />

      <div className="main-content">
        <Routes>

          {/* Public Routes - bina login ke accessible */}
          <Route path="/"         element={<Home />} />
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes - login zaroori */}
          <Route path="/cart" element={
            <ProtectedRoute><Cart /></ProtectedRoute>
          } />
          <Route path="/orders" element={
            <ProtectedRoute><Orders /></ProtectedRoute>
          } />

          {/* Admin Only */}
          <Route path="/admin" element={
            <AdminRoute><AdminPanel /></AdminRoute>
          } />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
