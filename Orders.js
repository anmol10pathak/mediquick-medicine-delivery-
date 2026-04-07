import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("orders")) || [];

    // If no status exists, assign random status (for demo)
    const updated = data.map((o) => ({
      ...o,
      status: o.status || getRandomStatus(),
    }));

    setOrders(updated.reverse());
  }, []);
  function getRandomStatus() {
  const list = ["Placed", "Shipped", "Out for Delivery", "Delivered"];
  return list[Math.floor(Math.random() * list.length)];
}

  return (
    <div style={container}>
      <div style={header}>
        <h2>📦 My Orders</h2>
        <button style={homeBtn} onClick={() => navigate("/")}>
          ⬅ Home
        </button>
      </div>

      {orders.length === 0 ? (
        <div style={emptyBox}>
          <h3>No orders yet 😢</h3>
          <button style={shopBtn} onClick={() => navigate("/")}>
            Shop Now
          </button>
        </div>
      ) : (
        orders.map((order, index) => (
          <div key={index} style={card}>
            {/* TOP */}
            <div style={topRow}>
              <div>
                <p><b>Order ID:</b> #{order.id || index + 1}</p>
                <p style={{ fontSize: "13px", color: "gray" }}>
                  {order.date || "Recently placed"}
                </p>
              </div>

              <span style={statusBadge(order.status)}>
                {order.status}
              </span>
            </div>

            {/* TRACKING */}
            <TrackingSteps current={order.status} />

            {/* ITEMS */}
            <div style={itemsBox}>
              {order.items?.map((item) => (
                <div key={item.id} style={itemRow}>
                  <img src={item.image} alt={item.name} style={img} />
                  <div style={{ flex: 1 }}>
                    <p>{item.name}</p>
                    <p style={{ fontSize: "12px", color: "gray" }}>
                      Qty: {item.qty}
                    </p>
                  </div>
                  <p>₹{item.price}</p>
                </div>
              ))}
            </div>

            {/* BOTTOM */}
            <div style={bottomRow}>
              <h3>Total: ₹{order.total}</h3>
              <span style={{ fontSize: "13px", color: "gray" }}>
                Expected Delivery: 2-3 days
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrders;
const steps = ["Placed", "Shipped", "Out for Delivery", "Delivered"];

function TrackingSteps({ current }) {
  const currentIndex = steps.indexOf(current);

  return (
    <div style={trackContainer}>
      {steps.map((step, i) => (
        <div key={i} style={stepBox}>
          <div
            style={{
              ...circle,
              background: i <= currentIndex ? "#16a34a" : "#cbd5e1",
            }}
          >
            {i <= currentIndex ? "✔" : ""}
          </div>

          <p style={{ fontSize: "12px" }}>{step}</p>

          {i !== steps.length - 1 && (
            <div
              style={{
                ...line,
                background: i < currentIndex ? "#16a34a" : "#cbd5e1",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
const container = {
  padding: "25px",
  background: "#f1f5f9",
  minHeight: "100vh",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "20px",
};

const homeBtn = {
  background: "#2563eb",
  color: "white",
  padding: "8px 12px",
  border: "none",
  borderRadius: "6px",
};

const card = {
  background: "white",
  padding: "15px",
  borderRadius: "12px",
  marginBottom: "20px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
};

const topRow = {
  display: "flex",
  justifyContent: "space-between",
};

const statusBadge = (status) => ({
  background: "#dcfce7",
  color: "#16a34a",
  padding: "5px 10px",
  borderRadius: "20px",
  fontSize: "12px",
});

const itemsBox = {
  marginTop: "10px",
};

const itemRow = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "8px",
};

const img = {
  width: "50px",
  height: "50px",
  borderRadius: "6px",
};

const bottomRow = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "10px",
};

/* TRACKING */
const trackContainer = {
  display: "flex",
  justifyContent: "space-between",
  margin: "15px 0",
  position: "relative",
};

const stepBox = {
  textAlign: "center",
  flex: 1,
  position: "relative",
};

const circle = {
  width: "25px",
  height: "25px",
  borderRadius: "50%",
  margin: "0 auto",
  color: "white",
  fontSize: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const line = {
  height: "3px",
  width: "100%",
  position: "absolute",
  top: "12px",
  left: "50%",
  zIndex: -1,
};

const emptyBox = {
  textAlign: "center",
  marginTop: "100px",
};

const shopBtn = {
  padding: "10px",
  background: "#16a34a",
  color: "white",
  border: "none",
  borderRadius: "8px",
};