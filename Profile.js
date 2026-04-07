import React, { useEffect, useState } from "react";
import { getUser, logoutUser, isLoggedIn } from "../utils/auth";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }

    setUser(getUser());
    setOrders(JSON.parse(localStorage.getItem("orders")) || []);
    setAddresses(JSON.parse(localStorage.getItem("addresses")) || []);
  }, [navigate]);

  return (
    <div style={container}>
      {/* HEADER */}
      <div style={header}>
        <h2>👤 My Profile</h2>

        <div>
          <button style={navBtn} onClick={() => navigate("/")}>Home</button>
          <button style={navBtn} onClick={() => navigate("/orders")}>Orders</button>
          <button style={navBtn} onClick={() => navigate("/cart")}>Cart</button>
        </div>
      </div>

      {/* USER CARD */}
      <div style={card}>
        <h3>👋 Welcome, {user?.name}</h3>
        <p>Email: {user?.email}</p>

        <button
          style={logoutBtn}
          onClick={() => {
            logoutUser();
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>

      {/* ADDRESS SECTION */}
      <div style={card}>
        <h3>📍 Saved Addresses</h3>

        {addresses.length === 0 ? (
          <p>No address added</p>
        ) : (
          addresses.map((addr, i) => (
            <div key={i} style={addressBox}>
              <p><b>{addr.name}</b> ({addr.phone})</p>
              <p>{addr.house}, {addr.city}, {addr.state} - {addr.pincode}</p>
              <p style={{ fontSize: "13px", color: "gray" }}>
                {addr.fullAddress}
              </p>
              {addr.landmark && <p>📍 {addr.landmark}</p>}
            </div>
          ))
        )}
      </div>

      {/* ORDERS SECTION */}
      <div style={card}>
        <h3>📦 Recent Orders</h3>

        {orders.length === 0 ? (
          <p>No orders yet</p>
        ) : (
          orders.slice(0, 3).map((order, i) => (
            <div key={i} style={orderBox}>
              <p><b>Order #{order.id || i + 1}</b></p>
              <p>Total: ₹{order.total}</p>
              <p style={{ fontSize: "12px", color: "gray" }}>
                {order.date || "Recently placed"}
              </p>
            </div>
          ))
        )}

        <button style={viewBtn} onClick={() => navigate("/orders")}>
          View All Orders →
        </button>
      </div>
    </div>
  );
}

export default Profile;


/* ================= STYLES ================= */

const container = {
  padding: "25px",
  background: "#f1f5f9",
  minHeight: "100vh",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
};

const navBtn = {
  marginLeft: "10px",
  padding: "8px 12px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const card = {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  marginBottom: "20px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
};

const logoutBtn = {
  marginTop: "10px",
  padding: "8px 12px",
  background: "#ef4444",
  color: "white",
  border: "none",
  borderRadius: "6px",
};

const addressBox = {
  padding: "10px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  marginTop: "10px",
  background: "#fafafa",
};

const orderBox = {
  padding: "10px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  marginTop: "10px",
};

const viewBtn = {
  marginTop: "10px",
  padding: "10px",
  background: "#16a34a",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};