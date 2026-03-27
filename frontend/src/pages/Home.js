import React, { useEffect, useState } from "react";
import { getAllProducts } from "../api/api";
import ProductCard from "../components/ProductCard";
import "./Home.css";

// ===== Home Page =====
// Saare products yahan dikhte hain
// Koi bhi dekh sakta hai - login ki zaroorat nahi
function Home() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");

  // Page load hote hi products fetch karo
  useEffect(() => {
    fetchProducts();
  }, []); // [] = sirf ek baar chalega

  const fetchProducts = async () => {
    try {
      const res = await getAllProducts();
      setProducts(res.data);
    } catch (err) {
      setError("Products load nahi ho sake. Backend check karo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">

      {/* Hero Banner */}
      <div className="hero-section">
        <h1>Welcome to ShopEasy 🛒</h1>
        <p>Best products at best prices — India ka apna online store!</p>
      </div>

      <h2 className="page-title">All Products</h2>

      {/* Loading */}
      {loading && (
        <div className="loading">⏳ Products load ho rahe hain...</div>
      )}

      {/* Error */}
      {error && (
        <div className="alert alert-error">{error}</div>
      )}

      {/* No products */}
      {!loading && !error && products.length === 0 && (
        <div className="empty-state">
          <h3>😔 Koi product nahi mila</h3>
          <p>Admin se products add karwao!</p>
        </div>
      )}

      {/* Products Grid */}
      {!loading && products.length > 0 && (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
}

export default Home;
