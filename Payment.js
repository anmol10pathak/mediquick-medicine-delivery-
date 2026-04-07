import React, { useEffect, useState } from "react";
import { getCart, clearCart } from "../utils/cart";
import { useNavigate } from "react-router-dom";

function Payment() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState(null);
  const [method, setMethod] = useState("upi");

  const [card, setCard] = useState({
    number: "",
    expiry: "",
    cvv: "",
  });

  useEffect(() => {
    setCart(getCart());

    const savedAddress = localStorage.getItem("address");
    if (savedAddress) {
      setAddress(JSON.parse(savedAddress));
    }
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );

  const handlePayment = () => {
    if (cart.length === 0) {
      alert("Cart is empty ❌");
      return;
    }

    if (method === "card") {
      if (!card.number || !card.expiry || !card.cvv) {
        alert("Fill card details ❌");
        return;
      }
    }

    // ✅ GET OLD ORDERS
    const oldOrders = JSON.parse(localStorage.getItem("orders")) || [];

    // ✅ CREATE NEW ORDER
    const newOrder = {
      id: Date.now(),
      items: cart,
      total,
      address,
      date: new Date().toLocaleString(),
    };

    // ✅ SAVE UPDATED
    const updatedOrders = [...oldOrders, newOrder];
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    // ✅ CLEAR DATA
    clearCart();
    localStorage.removeItem("address");

    // ✅ NAVIGATE
    navigate("/success");
  };

  return (
    <div style={container}>
      <h2>💳 Payment</h2>

      {/* Address */}
      <div style={box}>
        <h3>Delivery Address</h3>
        {address ? (
          <p>
            <b>{address.name}</b> <br />
            {address.addressLine}, {address.city} <br />
            {address.state} - {address.pincode} <br />
            📞 {address.phone}
          </p>
        ) : (
          <p>No address found</p>
        )}
      </div>

      {/* Payment Options */}
      <div style={box}>
        <h3>Select Payment Method</h3>

        <label>
          <input
            type="radio"
            checked={method === "upi"}
            onChange={() => setMethod("upi")}
          />
          UPI
        </label>

        <br />

        <label>
          <input
            type="radio"
            checked={method === "card"}
            onChange={() => setMethod("card")}
          />
          Card
        </label>

        <br />

        <label>
          <input
            type="radio"
            checked={method === "cod"}
            onChange={() => setMethod("cod")}
          />
          Cash on Delivery
        </label>

        {/* UPI QR */}
        {method === "upi" && (
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay"
              alt="QR"
            />
            <p>Scan & Pay</p>
          </div>
        )}

        {/* CARD FORM */}
        {method === "card" && (
          <div style={{ marginTop: "20px" }}>
            <input
              placeholder="Card Number"
              value={card.number}
              onChange={(e) =>
                setCard({ ...card, number: e.target.value })
              }
              style={input}
            />

            <input
              placeholder="Expiry (MM/YY)"
              value={card.expiry}
              onChange={(e) =>
                setCard({ ...card, expiry: e.target.value })
              }
              style={input}
            />

            <input
              placeholder="CVV"
              value={card.cvv}
              onChange={(e) =>
                setCard({ ...card, cvv: e.target.value })
              }
              style={input}
            />
          </div>
        )}
      </div>

      <button style={btn} onClick={handlePayment}>
        Pay ₹{total}
      </button>
    </div>
  );
}

export default Payment;

const container = {
  padding: "30px",
  background: "#eef2ff",
  minHeight: "100vh",
};

const box = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  marginBottom: "20px",
};

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
};

const btn = {
  width: "100%",
  padding: "15px",
  background: "green",
  color: "white",
  border: "none",
  borderRadius: "6px",
};