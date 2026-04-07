import React, { useEffect, useState } from "react";
import {
  getCart,
  increaseQty,
  decreaseQty,
  removeFromCart,
} from "../utils/cart";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const refresh = () => setCart(getCart());

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
    }
    refresh();
  }, [navigate]);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div style={container}>
      <h2>🛒 Your Cart</h2>

      <div style={layout}>
        {/* LEFT - ITEMS */}
        <div style={left}>
          {cart.length === 0 ? (
            <h3>Your cart is empty 😢</h3>
          ) : (
            cart.map((item) => (
              <div key={item.id} style={card}>
                <img src={item.image} alt={item.name} style={img} />

                <div style={{ flex: 1 }}>
                  <h3>{item.name}</h3>
                  <p style={{ color: "gray" }}>{item.composition}</p>
                  <p>₹{item.price}</p>

                  <div style={qtyBox}>
                    <button onClick={() => { decreaseQty(item.id); refresh(); }}>−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => { increaseQty(item.id); refresh(); }}>+</button>
                  </div>
                </div>

                <button
                  style={removeBtn}
                  onClick={() => { removeFromCart(item.id); refresh(); }}
                >
                  ✖
                </button>
              </div>
            ))
          )}
        </div>

        {/* RIGHT - SUMMARY */}
        <div style={right}>
          <h3>Order Summary</h3>

          <p>Items: {cart.length}</p>
          <p>Total: ₹{total}</p>

          <button
            style={checkoutBtn}
            onClick={() => navigate("/checkout")}
            disabled={cart.length === 0}
          >
            Proceed to Checkout →
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;



/* STYLES */

const container = {
  padding: "20px",
  background: "#f1f5f9",
  minHeight: "100vh",
};

const layout = {
  display: "flex",
  gap: "20px",
};

const left = {
  flex: 3,
};

const right = {
  flex: 1,
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  height: "fit-content",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
};

const card = {
  display: "flex",
  gap: "15px",
  background: "white",
  padding: "15px",
  borderRadius: "10px",
  marginBottom: "15px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
};

const img = {
  width: "90px",
  height: "90px",
  objectFit: "cover",
  borderRadius: "8px",
};

const qtyBox = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginTop: "10px",
};

const removeBtn = {
  background: "red",
  color: "white",
  border: "none",
  padding: "5px 10px",
  borderRadius: "5px",
  cursor: "pointer",
};

const checkoutBtn = {
  width: "100%",
  padding: "12px",
  marginTop: "15px",
  background: "#16a34a",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};