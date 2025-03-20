import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

const MyOrders = ({ orders, setOrders }) => {
  const navigate = useNavigate();

  const handleDelete = (id, status) => {
    if (status === "Completed") return;
    const confirmDelete = window.confirm("Are you sure you want to delete this order?");
    if (confirmDelete) {
      setOrders(orders.filter(order => order.id !== id));
    }
  };

  return (
    <div className="container">
      <h2>My Orders</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.name}</td>
                <td>{order.quantity}</td>
                <td>${order.price}</td>
                <td>${order.quantity * order.price}</td>
                <td>{order.status}</td> {/* Se muestra solo como texto */}
                <td>
                  <button 
                    onClick={() => navigate(`/edit/${order.id}`)} 
                    disabled={order.status === "Completed"}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(order.id, order.status)} 
                    disabled={order.status === "Completed"}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="add-button" onClick={() => navigate("/add")}>Add New Order</button>
    </div>
  );
};

export default MyOrders;
