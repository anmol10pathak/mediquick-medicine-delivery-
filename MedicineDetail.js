import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AppContext } from "./context";

function MedicineDetail() {
  const { id } = useParams();
  const [med, setMed] = useState(null);

  const { addToCart } = useContext(AppContext);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/medicines/${id}`)
      .then(res => setMed(res.data))
      .catch(err => console.log(err));
  }, [id]);

  if (!med) return <h2>Loading...</h2>;

  return (
    <div style={{ display: "flex", padding: "40px", gap: "40px" }}>
      
      {/* IMAGE */}
      <img 
        src={med.image}
        alt={med.name}
        style={{ width: "400px", height: "400px", objectFit: "cover" }}
      />

      {/* DETAILS */}
      <div>
        <h1>{med.name}</h1>
        <h2>₹{med.price}</h2>
        <p>{med.description}</p>
        <p><b>Category:</b> {med.category}</p>

        <button 
          onClick={() => addToCart(med)}
          style={{
            padding: "10px 20px",
            background: "green",
            color: "white",
            border: "none"
          }}
        >
          Add to Cart
        </button>
      </div>

    </div>
  );
}

export default MedicineDetail;