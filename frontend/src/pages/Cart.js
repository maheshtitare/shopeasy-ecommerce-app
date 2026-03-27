import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCartItems, removeFromCart, placeOrder } from "../api/api";
import CartItem from "../components/CartItem";
import "./Cart.css";

// ===== Cart Page =====
// Logged-in user ka cart dikhega yahan
// Features: items list, total price, remove item, place order
function Cart() {

  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState("");
  const [orderMsg, setOrderMsg]   = useState("");

  // Page load hote hi cart fetch karo
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await getCartItems();
      setCartItems(res.data);
    } catch (err) {
      setError("Cart load nahi ho saka! Dobara try karo.");
    } finally {
      setLoading(false);
    }
  };

  // Item remove karo
  const handleRemove = async (cartItemId) => {
    try {
      await removeFromCart(cartItemId);
      // API call se data dobara fetch karne ki zaroorat nahi
      // sirf local state se item hatao
      setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
    } catch (err) {
      setError("Item remove nahi hua. Dobara try karo.");
    }
  };

  // Order place karo
  const handlePlaceOrder = async () => {
    setError("");
    try {
      await placeOrder();
      setCartItems([]); // UI me bhi cart clear karo
      setOrderMsg("🎉 Order successfully place ho gaya! Orders page pe dekho.");
      // 3 second baad orders page pe bhejo
      setTimeout(() => navigate("/orders"), 3000);
    } catch (err) {
      setError(err.response?.data?.error || "Order place nahi ho saka!");
    }
  };

  // Total price calculate karo - price * quantity ka sum
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="container">
      <h2 className="page-title">🛍️ My Cart</h2>

      {loading  && <div className="loading">⏳ Cart load ho raha hai...</div>}
      {error    && <div className="alert alert-error">{error}</div>}
      {orderMsg && <div className="alert alert-success">{orderMsg}</div>}

      {/* Cart Khali Hai */}
      {!loading && cartItems.length === 0 && !orderMsg && (
        <div className="empty-state">
          <h3>🛒 Cart khali hai!</h3>
          <p>Home page pe jao aur kuch products add karo.</p>
          <button
            className="btn-primary"
            style={{ marginTop: "16px" }}
            onClick={() => navigate("/")}
          >
            Products Dekho
          </button>
        </div>
      )}

      {/* Cart Items + Summary */}
      {cartItems.length > 0 && (
        <div className="cart-layout">

          {/* Left side - Cart Items List */}
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} onRemove={handleRemove} />
            ))}
          </div>

          {/* Right side - Order Summary Box */}
          <div className="order-summary card">

            <h3 className="summary-title">Order Summary</h3>

            <div className="summary-row">
              <span>Items ({cartItems.length})</span>
              <span>₹{totalPrice.toLocaleString("en-IN")}</span>
            </div>

            <div className="summary-row">
              <span>Delivery Charges</span>
              <span className="free-tag">FREE</span>
            </div>

            <hr className="summary-divider" />

            <div className="summary-row total-row">
              <span>Total Amount</span>
              <span>₹{totalPrice.toLocaleString("en-IN")}</span>
            </div>

            <button
              className="btn-success place-order-btn"
              onClick={handlePlaceOrder}
            >
              ✅ Place Order
            </button>

          </div>
        </div>
      )}

    </div>
  );
}

export default Cart;
