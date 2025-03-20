import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h1>📦 My Orders</h1>
      <div>
        <Link to="/my-orders">Orders</Link>
        <Link to="/add-order/new">Add Order</Link>
      </div>
    </nav>
  );
}

export default Navbar;
