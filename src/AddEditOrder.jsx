import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./App.css";

const AddEditOrder = ({ orders, setOrders }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = id !== undefined;

  const [orderData, setOrderData] = useState({
    id: isEditing ? id : Date.now(),
    name: "",
    quantity: 1,
    price: 0,
    status: "Pending",
  });

  useEffect(() => {
    if (isEditing) {
      const existingOrder = orders.find((order) => order.id.toString() === id);
      if (existingOrder) {
        setOrderData(existingOrder);
      }
    }
  }, [id, isEditing, orders]);

  const handleChange = (e) => {
    setOrderData({
      ...orderData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      setOrders(orders.map((order) => (order.id.toString() === id ? orderData : order)));
    } else {
      setOrders([...orders, orderData]);
    }

    navigate("/");
  };

  return (
    <div className="container">
      <h2>{isEditing ? "Edit Order" : "Add Order"}</h2>

      <form onSubmit={handleSubmit}>
        <label>Product Name</label>
        <input 
          type="text" 
          name="name" 
          value={orderData.name} 
          onChange={handleChange} 
          required 
        />

        <label>Quantity</label>
        <input 
          type="number" 
          name="quantity" 
          value={orderData.quantity} 
          onChange={handleChange} 
          min="1" 
          required 
        />

        <label>Unit Price</label>
        <input 
          type="number" 
          name="price" 
          value={orderData.price} 
          onChange={handleChange} 
          min="0" 
          required 
        />

        {isEditing && (
          <>
            <label>Status</label>
            <select name="status" value={orderData.status} onChange={handleChange}>
              <option value="Pending">Pending</option>
              <option value="InProgress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </>
        )}

        <button type="submit">{isEditing ? "Save Changes" : "Add Product"}</button>
        <button type="button" className="cancel-button" onClick={() => navigate("/")}>Cancel</button>
      </form>
    </div>
  );
};

export default AddEditOrder;
