import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = ({ orders, setOrders }) => {
  const { orderId, productId } = useParams();
  const navigate = useNavigate();

  const order = orders.find((o) => o.id === parseInt(orderId)) || null;
  const product = order ? order.products.find((p) => p.id === parseInt(productId)) : null;

  const [editedProduct, setEditedProduct] = useState(product ? { ...product } : null);

  useEffect(() => {
    if (!order || !product) {
      navigate("/");
    }
  }, [order, product, navigate]);

  const handleSave = () => {
    if (!editedProduct.name || !editedProduct.price || !editedProduct.qty) {
      alert("Please fill in all fields.");
      return;
    }

    const updatedProducts = order.products.map((p) =>
      p.id === editedProduct.id ? editedProduct : p
    );

    const updatedOrder = {
      ...order,
      products: updatedProducts,
      totalPrice: updatedProducts.reduce((sum, p) => sum + p.totalPrice, 0),
    };

    setOrders(orders.map((o) => (o.id === order.id ? updatedOrder : o)));
    navigate("/");
  };

  return (
    editedProduct && (
      <div className="order-container">
        <h1>Edit Product</h1>
        <input
          type="text"
          placeholder="Product Name"
          value={editedProduct.name}
          onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={editedProduct.price}
          onChange={(e) => setEditedProduct({ ...editedProduct, price: parseFloat(e.target.value) })}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={editedProduct.qty}
          onChange={(e) => setEditedProduct({ ...editedProduct, qty: parseInt(e.target.value) })}
        />
        <button className="save-btn" onClick={handleSave}>Save Changes</button>
        <button className="cancel-btn" onClick={() => navigate("/")}>Cancel</button>
      </div>
    )
  );
};

export default EditProduct;
