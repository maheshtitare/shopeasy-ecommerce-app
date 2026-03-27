import React from "react";
import "./CartItem.css";

// ===== Cart Item Component =====
// Cart page pe ek item ka display
// Props:
//   item    = { id, product: { name, price, imageUrl }, quantity }
//   onRemove = function to call when Remove is clicked
function CartItem({ item, onRemove }) {

  const { id, product, quantity } = item;
  const subtotal = product.price * quantity;

  return (
    <div className="cart-item card">

      {/* Product Image */}
      <img
        src={product.imageUrl || "https://via.placeholder.com/80"}
        alt={product.name}
        className="cart-item-img"
        onError={(e) => { e.target.src = "https://via.placeholder.com/80"; }}
      />

      {/* Product Info */}
      <div className="cart-item-info">
        <h4 className="cart-item-name">{product.name}</h4>
        <p className="cart-item-price">
          ₹{product.price.toLocaleString("en-IN")} × {quantity}
        </p>
        <p className="cart-item-subtotal">
          Subtotal: <strong>₹{subtotal.toLocaleString("en-IN")}</strong>
        </p>
      </div>

      {/* Remove Button */}
      <button className="btn-danger" onClick={() => onRemove(id)}>
        Remove
      </button>

    </div>
  );
}

export default CartItem;
