import React, { useEffect, useState } from "react";
import { getMyOrders } from "../api/api";
import "./Orders.css";

// ===== Orders Page =====
// Logged-in user ke saare purane orders yahan dikhenge
// Latest orders pehle aayenge
function Orders() {

  const [orders, setOrders]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");

  // Page load hote hi orders fetch karo
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await getMyOrders();
      // Latest orders pehle dikhao (array ko reverse karo)
      setOrders(res.data.reverse());
    } catch (err) {
      setError("Orders load nahi ho sake! Dobara try karo.");
    } finally {
      setLoading(false);
    }
  };

  // Status ke hisaab se badge CSS class return karo
  const getBadgeClass = (status) => {
    if (status === "PLACED")    return "badge badge-placed";
    if (status === "SHIPPED")   return "badge badge-shipped";
    if (status === "DELIVERED") return "badge badge-delivered";
    return "badge";
  };

  // Date format karo - readable banana ke liye
  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleString("en-IN", {
      day:    "2-digit",
      month:  "short",
      year:   "numeric",
      hour:   "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="container">
      <h2 className="page-title">📦 My Orders</h2>

      {loading && <div className="loading">⏳ Orders load ho rahe hain...</div>}
      {error   && <div className="alert alert-error">{error}</div>}

      {/* Koi order nahi hai */}
      {!loading && orders.length === 0 && !error && (
        <div className="empty-state">
          <h3>😔 Abhi tak koi order nahi hai</h3>
          <p>Cart me jao aur apna pehla order place karo!</p>
        </div>
      )}

      {/* Orders List */}
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.id} className="order-card card">

            {/* Order Header - ID, Date, Status Badge */}
            <div className="order-header">
              <div className="order-meta">
                <span className="order-id">Order #{order.id}</span>
                <span className="order-date">{formatDate(order.orderDate)}</span>
              </div>
              <span className={getBadgeClass(order.status)}>
                {order.status}
              </span>
            </div>

            {/* Order Body - Customer name aur total */}
            <div className="order-body">
              <div className="order-detail">
                <span className="detail-label">Customer</span>
                <span className="detail-value">{order.user?.name || "N/A"}</span>
              </div>
              <div className="order-detail">
                <span className="detail-label">Total Amount</span>
                <span className="detail-value order-amount">
                  ₹{order.totalPrice.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

export default Orders;
