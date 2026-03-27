import React, { useEffect, useState } from "react";
import {
  getAllProducts,
  addProduct,
  deleteProduct,
  getAllOrders,
  updateOrderStatus,
} from "../api/api";
import "./AdminPanel.css";

// ===== Admin Panel =====
// Sirf ADMIN role wala yahan aa sakta hai (App.js me AdminRoute check karta hai)
// Two tabs: Products Management + Orders Management
function AdminPanel() {

  const [products, setProducts]   = useState([]);
  const [orders, setOrders]       = useState([]);
  const [activeTab, setActiveTab] = useState("products"); // "products" ya "orders"
  const [loading, setLoading]     = useState(true);

  // Alert message state
  const [alertMsg, setAlertMsg]   = useState("");
  const [alertType, setAlertType] = useState("success"); // "success" ya "error"

  // New product form ki state
  const [newProduct, setNewProduct] = useState({
    name:        "",
    price:       "",
    description: "",
    imageUrl:    "",
    stock:       "",
  });

  // Page load hote hi data fetch karo
  useEffect(() => {
    loadAllData();
  }, []);

  // Products aur Orders dono ek saath fetch karo
  const loadAllData = async () => {
    setLoading(true);
    try {
      const [productRes, orderRes] = await Promise.all([
        getAllProducts(),
        getAllOrders(),
      ]);
      setProducts(productRes.data);
      setOrders(orderRes.data);
    } catch (err) {
      showAlert("Data load nahi ho saka!", "error");
    } finally {
      setLoading(false);
    }
  };

  // Alert message dikhao, 3 second baad hatao
  const showAlert = (text, type = "success") => {
    setAlertMsg(text);
    setAlertType(type);
    setTimeout(() => setAlertMsg(""), 3000);
  };

  // Naya product add karo
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        ...newProduct,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock),
      };
      const res = await addProduct(productData);

      // State me naya product add karo - page reload ki zaroorat nahi
      setProducts((prev) => [...prev, res.data]);

      // Form reset karo
      setNewProduct({ name: "", price: "", description: "", imageUrl: "", stock: "" });

      showAlert("✅ Product successfully add ho gaya!", "success");
    } catch (err) {
      showAlert(err.response?.data?.error || "Product add nahi ho saka!", "error");
    }
  };

  // Product delete karo
  const handleDeleteProduct = async (productId) => {
    const confirm = window.confirm("Pakka is product ko delete karna chahte ho?");
    if (!confirm) return;

    try {
      await deleteProduct(productId);
      setProducts((prev) => prev.filter((p) => p.id !== productId));
      showAlert("✅ Product delete ho gaya!", "success");
    } catch (err) {
      showAlert("Product delete nahi ho saka!", "error");
    }
  };

  // Order ka status update karo (dropdown se)
  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const res = await updateOrderStatus(orderId, newStatus);
      // State me bhi update karo
      setOrders((prev) =>
        prev.map((order) => (order.id === orderId ? res.data : order))
      );
      showAlert("✅ Order status update ho gaya!", "success");
    } catch (err) {
      showAlert("Status update nahi hua!", "error");
    }
  };

  // Status badge class
  const getBadge = (status) => {
    const map = {
      PLACED:    "badge badge-placed",
      SHIPPED:   "badge badge-shipped",
      DELIVERED: "badge badge-delivered",
    };
    return map[status] || "badge";
  };

  // Loading state
  if (loading) {
    return <div className="loading container">⏳ Admin panel load ho raha hai...</div>;
  }

  return (
    <div className="container">
      <h2 className="page-title">⚙️ Admin Panel</h2>

      {/* Alert Message */}
      {alertMsg && (
        <div className={`alert alert-${alertType === "error" ? "error" : "success"}`}>
          {alertMsg}
        </div>
      )}

      {/* Tab Buttons */}
      <div className="admin-tabs">
        <button
          className={`tab-btn ${activeTab === "products" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("products")}
        >
          🛍️ Products ({products.length})
        </button>
        <button
          className={`tab-btn ${activeTab === "orders" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("orders")}
        >
          📦 Orders ({orders.length})
        </button>
      </div>

      {/* ============================================================ */}
      {/* PRODUCTS TAB                                                  */}
      {/* ============================================================ */}
      {activeTab === "products" && (
        <div>

          {/* Add New Product Form */}
          <div className="admin-form-card card">
            <h3 className="form-heading">➕ Naya Product Add Karo</h3>

            <form onSubmit={handleAddProduct}>

              <div className="form-group">
                <label>Product Name *</label>
                <input
                  type="text"
                  placeholder="e.g. iPhone 15"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  required
                />
              </div>

              {/* Price aur Stock ek row me */}
              <div className="two-col-row">
                <div className="form-group">
                  <label>Price (₹) *</label>
                  <input
                    type="number"
                    placeholder="e.g. 79999"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    required
                    min="1"
                  />
                </div>
                <div className="form-group">
                  <label>Stock Quantity *</label>
                  <input
                    type="number"
                    placeholder="e.g. 50"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                    required
                    min="0"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  rows={2}
                  placeholder="Product ke baare me likho..."
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={newProduct.imageUrl}
                  onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                />
              </div>

              <button type="submit" className="btn-primary">
                Add Product
              </button>

            </form>
          </div>

          {/* All Products Table */}
          <h3 className="section-title">📋 All Products ({products.length})</h3>

          <div className="table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>#{product.id}</td>
                    <td>
                      <img
                        src={product.imageUrl || "https://via.placeholder.com/50"}
                        alt={product.name}
                        className="table-img"
                        onError={(e) => { e.target.src = "https://via.placeholder.com/50"; }}
                      />
                    </td>
                    <td className="product-name-col">{product.name}</td>
                    <td>₹{product.price.toLocaleString("en-IN")}</td>
                    <td>
                      <span className={product.stock > 0 ? "stock-good" : "stock-bad"}>
                        {product.stock}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn-danger"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* ============================================================ */}
      {/* ORDERS TAB                                                    */}
      {/* ============================================================ */}
      {activeTab === "orders" && (
        <div>

          <h3 className="section-title">📋 All Customer Orders ({orders.length})</h3>

          <div className="table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Email</th>
                  <th>Total</th>
                  <th>Order Date</th>
                  <th>Status</th>
                  <th>Update Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>{order.user?.name}</td>
                    <td className="email-col">{order.user?.email}</td>
                    <td>₹{order.totalPrice.toLocaleString("en-IN")}</td>
                    <td className="date-col">
                      {order.orderDate
                        ? new Date(order.orderDate).toLocaleDateString("en-IN", {
                            day: "2-digit", month: "short", year: "numeric",
                          })
                        : "N/A"}
                    </td>
                    <td>
                      <span className={getBadge(order.status)}>{order.status}</span>
                    </td>
                    <td>
                      {/* Dropdown se status change karo */}
                      <select
                        className="status-select"
                        value={order.status}
                        onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                      >
                        <option value="PLACED">PLACED</option>
                        <option value="SHIPPED">SHIPPED</option>
                        <option value="DELIVERED">DELIVERED</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

    </div>
  );
}

export default AdminPanel;
