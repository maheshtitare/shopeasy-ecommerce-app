import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

// ===== Navbar Component =====
// Har page ke upar yeh dikhega
// Login ke baad Cart, Orders links dikhenge
// Admin ko extra "Admin Panel" link milega
function Navbar() {
  const navigate = useNavigate();

  // LocalStorage se user info lo
  const token = localStorage.getItem("token");
  const name  = localStorage.getItem("name");
  const role  = localStorage.getItem("role");

  // Logout: localStorage clear karo aur login page pe bhejo
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-container">

        {/* Logo - click karne pe Home jao */}
        <Link to="/" className="nav-logo">
          🛒 ShopEasy
        </Link>

        {/* Middle - Navigation Links */}
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>

          {/* Sirf logged-in users ke liye */}
          {token && (
            <>
              <Link to="/cart"   className="nav-link">🛍️ Cart</Link>
              <Link to="/orders" className="nav-link">📦 Orders</Link>
            </>
          )}

          {/* Sirf Admin ke liye */}
          {role === "ADMIN" && (
            <Link to="/admin" className="nav-link admin-link">⚙️ Admin</Link>
          )}
        </div>

        {/* Right - Login/Logout + User Name */}
        <div className="nav-auth">
          {token ? (
            <>
              <span className="nav-username">👤 {name}</span>
              <button className="nav-btn logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login"    className="nav-btn login-btn">Login</Link>
              <Link to="/register" className="nav-btn register-btn">Register</Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
