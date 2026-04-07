import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Track() {
  const { trackingId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const res = await axios.get(`http://localhost:5000/api/track/${trackingId}`);
      setOrder(res.data);
    };
    fetchOrder();
  }, [trackingId]);

  if (!order) return <p>Loading...</p>;

  return (
    <div>
      <h2>Tracking ID: {order.trackingId}</h2>
      <p>Status: <span style={{ color: order.status==='Pending' ? 'orange' : order.status==='Delivered' ? 'green' : 'red' }}>{order.status}</span></p>
      <p>Delivery Address: {order.deliveryAddress}</p>
      <p>Medicines:</p>
      <ul>
        {order.medicines.map(m => (
          <li key={m.medicineId}>{m.name} x {m.quantity}</li>
        ))}
      </ul>
    </div>
  );
}

export default Track;