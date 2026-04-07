import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user"));

    if (!u) {
      window.location.href = "/login";
    } else {
      setUser(u);
      fetchOrders(u._id);
    }
  }, []);

  const fetchOrders = async (userId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/orders/${userId}`
      );
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!user) return <h2>Loading...</h2>;

  return (
    <div style={styles.container}>
      
      {/* 👤 USER INFO */}
      <div style={styles.card}>
        <h2>👤 My Profile</h2>
        <p><b>Name:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>
      </div>

      {/* 📦 ORDERS */}
      <div style={styles.card}>
        <h2>📦 My Orders</h2>

        {orders.length === 0 ? (
          <p>No orders yet</p>
        ) : (
          orders.map((o, i) => (
            <div key={i} style={styles.orderBox}>
              
              <p><b>Order ID:</b> {o._id}</p>
              <p><b>Total:</b> ₹{o.total}</p>
              <p>
                <b>Status:</b>{" "}
                <span style={{
                  color: o.status === "Pending" ? "orange" : "green"
                }}>
                  {o.status}
                </span>
              </p>

              <p><b>Date:</b> {new Date(o.date).toLocaleString()}</p>

              {/* 🧾 ITEMS */}
              <div>
                {o.items.map((item, idx) => (
                  <div key={idx} style={styles.item}>
                    {item.name} × {item.qty || 1}
                  </div>
                ))}
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Profile;

const styles = {
  container: {
    padding: "30px",
    background: "#f9fafb",
    minHeight: "100vh"
  },
  card: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "20px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)"
  },
  orderBox: {
    border: "1px solid #ddd",
    padding: "10px",
    borderRadius: "10px",
    marginTop: "10px"
  },
  item: {
    fontSize: "14px",
    color: "#555"
  }
};