import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/api";
import "./AuthPages.css";

// ===== Login Page =====
function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  // Input change hone par state update karo
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form submit karne par login API call karo
  const handleSubmit = async (e) => {
    e.preventDefault(); // Default form reload rokna
    setError("");
    setLoading(true);

    try {
      const res  = await loginUser(formData);
      const data = res.data;

      // JWT token aur user info localStorage me save karo
      localStorage.setItem("token", data.token);
      localStorage.setItem("name",  data.name);
      localStorage.setItem("email", data.email);
      localStorage.setItem("role",  data.role);

      // Home page pe bhejo
      navigate("/");

    } catch (err) {
      setError(err.response?.data?.error || "Login failed! Email aur password check karo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card card">

        <div className="auth-header">
          <h2>🔐 Login</h2>
          <p>ShopEasy me wapas aao!</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="apni@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn-primary auth-submit-btn"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="auth-switch">
          Account nahi hai? <Link to="/register">Register karo</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;
