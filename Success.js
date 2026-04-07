import React from "react";
import { useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();

  return (
    <div style={container}>
      <div style={card}>
        <h1>🎉 Order Placed Successfully!</h1>
        <p>Your medicines will be delivered soon 🚚</p>

        <button style={btn} onClick={() => navigate("/orders")}>
          View Orders
        </button>
      </div>
    </div>
  );
}

export default Success;

const container = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#d1fae5",
};

const card = {
  background: "white",
  padding: "40px",
  borderRadius: "10px",
  textAlign: "center",
};

const btn = {
  marginTop: "20px",
  padding: "10px 20px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "6px",
};