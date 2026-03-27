import React, { useState } from "react";
import { addToCart } from "../api/api";
import "./ProductCard.css";

// ===== Product Card Component =====
// Home page pe har product yeh card me dikhega
// Props: product = { id, name, price, description, imageUrl, stock }
function ProductCard({ product }) {

  const [message, setMessage] = useState("");  // success ya error message
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token"); // Login check ke liye

  // Add to Cart button click handler
  const handleAddToCart = async () => {

    // Login nahi kiya to message dikhao
    if (!token) {
      setMessage("❌ Pehle login karo!");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    setLoading(true);
    try {
      await addToCart(product.id, 1); // default quantity = 1
      setMessage("✅ Cart me add ho gaya!");
    } catch (err) {
      setMessage("❌ Add nahi ho saka. Dobara try karo.");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 3000); // 3 second baad message hatao
    }
  };

  return (
    <div className="product-card card">

      {/* Product Image */}
      <img
        src={product.imageUrl || "https://via.placeholder.com/300x180?text=No+Image"}
        alt={product.name}
        className="product-img"
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/300x180?text=No+Image";
        }}
      />

      {/* Product Details */}
      <div className="product-body">

        <h3 className="product-name">{product.name}</h3>

        <p className="product-desc">
          {product.description || "No description available."}
        </p>

        <div className="product-footer">
          <span className="product-price">
            ₹{product.price.toLocaleString("en-IN")}
          </span>

          <span className={product.stock > 0 ? "stock-ok" : "stock-empty"}>
            {product.stock > 0 ? `${product.stock} left` : "Out of stock"}
          </span>
        </div>

        <button
          className="btn-primary add-btn"
          onClick={handleAddToCart}
          disabled={loading || product.stock === 0}
        >
          {loading ? "Adding..." : "🛒 Add to Cart"}
        </button>

        {/* Feedback message after add to cart */}
        {message && (
          <p className={`card-msg ${message.startsWith("✅") ? "msg-ok" : "msg-err"}`}>
            {message}
          </p>
        )}

      </div>
    </div>
  );
}

export default ProductCard;
