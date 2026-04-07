import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registered Successfully ✅");
        navigate("/login");
      } else {
        alert(data.message || "Register failed");
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        
        <h2 style={styles.title}>Create Your Account 🚀</h2>
        <p style={styles.subtitle}>Join us and start shopping medicines easily</p>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="password"
            name="password"
            placeholder="Create Password"
            onChange={handleChange}
            style={styles.input}
          />

          <button style={styles.button}>
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p style={styles.text}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>
            Login here
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;

// 🎨 Stylish UI
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #43cea2, #185a9d)"
  },
  card: {
    background: "#fff",
    padding: "35px",
    borderRadius: "15px",
    width: "380px",
    boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
    textAlign: "center"
  },
  title: {
    marginBottom: "5px",
    fontSize: "24px",
    fontWeight: "bold"
  },
  subtitle: {
    fontSize: "14px",
    color: "#777",
    marginBottom: "20px"
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #ddd",
    outline: "none",
    fontSize: "14px",
    transition: "0.3s",
  },
  button: {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    background: "linear-gradient(to right, #43cea2, #185a9d)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px"
  },
  text: {
    marginTop: "15px",
    fontSize: "14px"
  },
  link: {
    color: "#185a9d",
    fontWeight: "bold",
    textDecoration: "none"
  }
};