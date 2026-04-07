import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProductDetails() {
  const { id } = useParams();
  const [med, setMed] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/medicines/${id}`)
      .then(res => setMed(res.data));
  }, [id]);

  if (!med) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "30px" }}>

      <img src={med.image} width="250" alt={med.name} />

      <h1>{med.name}</h1>
      <h2 style={{ color: "green" }}>₹{med.price}</h2>

      <p><b>Composition:</b> {med.composition}</p>
      <p><b>Description:</b> {med.description}</p>

      <button>Add to Cart 🛒</button>
      <button style={{ marginLeft: "10px" }}>Buy Now ⚡</button>

    </div>
  );
}

export default ProductDetails;