import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import MyOrders from "./MyOrders";
import AddEditOrder from "./AddEditOrder";
import "./App.css";

function App() {
  const [orders, setOrders] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MyOrders orders={orders} setOrders={setOrders} />} />
        <Route path="/add" element={<AddEditOrder orders={orders} setOrders={setOrders} />} />
        <Route path="/edit/:id" element={<AddEditOrder orders={orders} setOrders={setOrders} />} />
      </Routes>
    </Router>
  );
}

export default App;
