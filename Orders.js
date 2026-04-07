import { useEffect, useState } from "react";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
          window.location.href = "/login";
          return;
        }

        const res = await axios.get(
          `http://localhost:5000/api/orders/${user._id}`
        );

        setOrders(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchOrders();
  }, []); // ✅ NO dependency = NO warning

  if (orders.length === 0) {
    return <h2 style={{ padding: "20px" }}>No Orders Found 📦</h2>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <h2>📦 Your Orders</h2>

      {orders.map((order, i) => (
        <div key={i} style={styles.card}>
          <h4>Order #{i + 1}</h4>
          <p>Total: ₹{order.total}</p>

          {order.items.map((item, idx) => (
            <div key={idx} style={styles.item}>
              <img
                src={item.image}
                alt={item.name}
                width="60"
                style={{ borderRadius: "8px" }}
              />
              <div>
                <p>{item.name}</p>
                <p>₹{item.price}</p>
                <p>Qty: {item.qty || 1}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ddd",
    padding: "15px",
    margin: "15px 0",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
  },
  item: {
    display: "flex",
    gap: "15px",
    marginTop: "10px",
    alignItems: "center"
  }
};

export default Orders;