import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCart } from "../utils/cart";

function Checkout() {
  const navigate = useNavigate();
  const cart = getCart();

  const [addresses, setAddresses] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    pincode: "",
    city: "",
    state: "",
    house: "",
    fullAddress: "",
    landmark: "",
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("addresses")) || [];
    setAddresses(saved);
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // ✅ Add Address
  const addAddress = () => {
    if (!form.name || !form.phone || !form.house || !form.fullAddress) {
      alert("Please fill required fields ❌");
      return;
    }

    const updated = [...addresses, form];
    setAddresses(updated);
    localStorage.setItem("addresses", JSON.stringify(updated));

    setForm({
      name: "",
      phone: "",
      pincode: "",
      city: "",
      state: "",
      house: "",
      fullAddress: "",
      landmark: "",
    });
  };

  // ✅ Proceed
  const handleCheckout = () => {
    if (selectedIndex === null) {
      alert("Select address ❌");
      return;
    }

    localStorage.setItem(
      "selectedAddress",
      JSON.stringify(addresses[selectedIndex])
    );

    navigate("/payment");
  };

  return (
    <div style={container}>
      <h2 style={{ marginBottom: "20px" }}>📦 Checkout</h2>

      <div style={layout}>
        {/* LEFT */}
        <div style={left}>
          <h3 style={title}>Saved Addresses</h3>

          {addresses.map((addr, i) => (
            <div
              key={i}
              style={{
                ...addressCard,
                border:
                  selectedIndex === i
                    ? "2px solid #16a34a"
                    : "1px solid #ddd",
              }}
            >
              <input
                type="radio"
                checked={selectedIndex === i}
                onChange={() => setSelectedIndex(i)}
              />

              <div>
                <p>
                  <b>{addr.name}</b> ({addr.phone})
                </p>
                <p>
                  {addr.house}, {addr.city}, {addr.state} - {addr.pincode}
                </p>

                {/* ✅ FULL ADDRESS */}
                <p style={{ color: "#555", fontSize: "13px" }}>
                  {addr.fullAddress}
                </p>

                {addr.landmark && (
                  <p style={{ fontSize: "12px" }}>
                    📍 {addr.landmark}
                  </p>
                )}
              </div>
            </div>
          ))}

          {/* ADD ADDRESS */}
          <h3 style={title}>+ Add New Address</h3>

          <div style={formBox}>
            <div style={row}>
              <input style={input} placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })} />

              <input style={input} placeholder="Phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>

            <div style={row}>
              <input style={input} placeholder="House / Flat"
                value={form.house}
                onChange={(e) => setForm({ ...form, house: e.target.value })} />

              <input style={input} placeholder="City"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })} />
            </div>

            <div style={row}>
              <input style={input} placeholder="State"
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })} />

              <input style={input} placeholder="Pincode"
                value={form.pincode}
                onChange={(e) => setForm({ ...form, pincode: e.target.value })} />
            </div>

            {/* ✅ FULL ADDRESS TEXTAREA */}
            <textarea
              style={textarea}
              placeholder="Full Address (Street, Area, etc.)"
              value={form.fullAddress}
              onChange={(e) =>
                setForm({ ...form, fullAddress: e.target.value })
              }
            />

            <input
              style={input}
              placeholder="Landmark (Optional)"
              value={form.landmark}
              onChange={(e) =>
                setForm({ ...form, landmark: e.target.value })
              }
            />

            <button style={addBtn} onClick={addAddress}>
              Save Address
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div style={right}>
          <h3 style={title}>Order Summary</h3>

          {cart.map((item) => (
            <div key={item.id} style={itemRow}>
              {item.name} × {item.qty}
            </div>
          ))}

          <hr />

          <h2>Total: ₹{total}</h2>

          <button style={payBtn} onClick={handleCheckout}>
            Proceed to Payment →
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;


/* ===== STYLES ===== */

const container = {
  padding: "25px",
  background: "#f1f5f9",
  minHeight: "100vh",
};

const layout = {
  display: "flex",
  gap: "25px",
};

const left = {
  flex: 2,
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
};

const right = {
  flex: 1,
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  height: "fit-content",
};

const title = {
  marginBottom: "10px",
};

const addressCard = {
  display: "flex",
  gap: "10px",
  padding: "12px",
  borderRadius: "10px",
  marginBottom: "10px",
  background: "#fafafa",
};

const formBox = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const row = {
  display: "flex",
  gap: "10px",
};

const input = {
  flex: 1,
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const textarea = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  minHeight: "70px",
};

const addBtn = {
  background: "#2563eb",
  color: "white",
  padding: "10px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const itemRow = {
  marginBottom: "8px",
};

const payBtn = {
  width: "100%",
  padding: "12px",
  background: "#16a34a",
  color: "white",
  border: "none",
  borderRadius: "10px",
  marginTop: "10px",
  fontSize: "16px",
};