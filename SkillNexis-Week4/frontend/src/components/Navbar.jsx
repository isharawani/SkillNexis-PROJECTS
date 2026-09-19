import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Navbar.css";

function Navbar() {
    const { cartCount } = useCart();
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
        window.location.reload();
    };

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-logo">
                |3ELEVEN||
            </Link>

            <div className="navbar-links">
                <Link to="/">Home</Link>

                <Link to="/products">
                    Products
                </Link>

                {token && user ? (
                    <>
                        <Link to="/orders">
                            My Orders
                        </Link>
                        {user.role === "admin" && (
    <>
        <Link to="/admin/dashboard">
            Admin Dashboard
        </Link>

        <Link to="/admin/products">
            Admin Products
        </Link>

        <Link to="/admin/orders">
            Admin Orders
        </Link>
    </>
)}

                        <span className="welcome-user">
                            Welcome, {user.name}
                        </span>

                        <button
                            className="logout-btn"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <Link to="/login">
                        Login
                    </Link>
                )}

                <Link to="/cart" className="cart-link">
                    Cart

                    {cartCount > 0 && (
                        <span className="cart-count">
                            {cartCount}
                        </span>
                    )}
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;