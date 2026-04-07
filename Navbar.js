import { Link } from "react-router-dom";
import { FaShoppingCart, FaCapsules } from "react-icons/fa";

function Navbar() {

  // ✅ STEP 5B: GET USER
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={styles.nav}>

      {/* LOGO */}
      <h2><FaCapsules /> MedStore</h2>

      {/* LINKS */}
      <div style={styles.links}>
        <Link to="/">Home</Link>
        <Link to="/cart"><FaShoppingCart /> Cart</Link>

        {/* 🔥 USER SHOW */}
        {user ? (
          <span>👋 {user.name}</span>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
        <button onClick={() => {
  localStorage.removeItem("user");
  window.location.reload();
}}>
  Logout
</button>
      </div>

    </div>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 30px",
    background: "#2563eb",
    color: "white"
  },
  links: {
    display: "flex",
    gap: "20px",
    alignItems: "center"
  }
};

export default Navbar;