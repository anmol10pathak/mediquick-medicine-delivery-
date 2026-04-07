import React, { useEffect, useState } from "react";
import { medicines } from "../data/medicines";
import { addToCart, clearCart } from "../utils/cart";
import { useNavigate } from "react-router-dom";

function getUser() {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
}

function isLoggedIn() {
  return !!getUser();
}

function logoutUser() {
  localStorage.removeItem("user");
}

function Home() {
  const [medList, setMedList] = useState([]);
  const navigate = useNavigate();
  const user = getUser();

  useEffect(() => {
    const uniqueMeds = medicines.map((m, i) => ({
      ...m,
      id: i + 1,
    }));
    setMedList(uniqueMeds);
  }, []);

  const handleBuyNow = (med) => {
    if (!isLoggedIn()) {
      alert("Please login first ❌");
      navigate("/login");
      return;
    }
    clearCart();
    addToCart({ ...med, qty: 1 });
    navigate("/checkout");
  };

  return (
    <div>
      {/* NAVBAR */}
      <div style={nav}>
        <h2 onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          💊 MediQuick
        </h2>

        <div style={navRight}>
          {isLoggedIn() && user ? (
            <>
              <span>👋 {user.name || "User"}</span>
              {user.isAdmin && <button onClick={() => navigate("/admin")}>Admin Panel</button>}
              <button onClick={() => navigate("/cart")}>Cart</button>
              <button onClick={() => navigate("/orders")}>Orders</button>
              <button onClick={() => navigate("/profile")}>Profile</button>
              <button
                onClick={() => {
                  logoutUser();
                  navigate("/login");
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={() => navigate("/login")}>Login</button>
              <button onClick={() => navigate("/register")}>Register</button>
            </>
          )}
        </div>
      </div>

      {/* MEDICINES */}
      <div style={grid}>
        {medList.map((med) => (
          <div key={med.id} style={card}>
            <img src={med.image} alt={med.name} style={img} />
            <h3 style={title}>{med.name}</h3>
            <p style={useText}>💊 {med.description}</p>
            <p style={priceText}>₹{med.price}</p>
            <div style={btnRow}>
              <button
                style={cartBtn}
                onClick={() => {
                  addToCart(med);
                  alert("Added to cart ✅");
                }}
              >
                Add to Cart
              </button>
              <button style={buyBtn} onClick={() => handleBuyNow(med)}>
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

/* ================= STYLES ================= */

const nav = { display: "flex", justifyContent: "space-between", padding: "15px 20px", background: "#2563eb", color: "white" };
const navRight = { display: "flex", gap: "10px", alignItems: "center" };
const grid = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "20px", padding: "20px", background: "#f1f5f9" };
const card = { background: "white", padding: "15px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", textAlign: "center" };
const img = { width: "100%", height: "130px", objectFit: "cover", borderRadius: "8px" };
const title = { fontSize: "15px", margin: "10px 0" };
const useText = { fontSize: "13px", color: "gray" };
const priceText = { fontSize: "14px", fontWeight: "bold", margin: "5px 0" };
const btnRow = { display: "flex", gap: "10px", marginTop: "10px" };
const cartBtn = { flex: 1, background: "#16a34a", color: "white", border: "none", padding: "8px", borderRadius: "6px", cursor: "pointer" };
const buyBtn = { flex: 1, background: "#f97316", color: "white", border: "none", padding: "8px", borderRadius: "6px", cursor: "pointer" };