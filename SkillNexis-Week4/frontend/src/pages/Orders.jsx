import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Orders.css";

function Orders() {
    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const response = await API.get(
                    "/orders/my-orders",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setOrders(response.data);
            } catch (error) {
                console.error(error);

                setError(
                    error.response?.data?.message ||
                    "Unable to load orders."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [navigate]);

    if (loading) {
        return (
            <div className="orders-page">
                <h1>My Orders</h1>
                <p>Loading orders...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="orders-page">
                <h1>My Orders</h1>
                <p className="orders-error">{error}</p>
            </div>
        );
    }

    return (
        <div className="orders-page">
            <div className="orders-header">
                <h1>My Orders</h1>
                <Link to="/products">
                    Continue Shopping
                </Link>
            </div>

            {orders.length === 0 ? (
                <div className="no-orders">
                    <h2>No Orders Yet 📦</h2>
                    <p>
                        You haven't placed any orders yet.
                    </p>

                    <Link
                        to="/products"
                        className="shop-now-btn"
                    >
                        Shop Now
                    </Link>
                </div>
            ) : (
                <div className="orders-list">
                    {orders.map((order) => (
                        <div
                            className="order-card"
                            key={order._id}
                        >
                            <div className="order-top">
                                <div>
                                    <h2>
                                        Order #
                                        {order._id.slice(-6)}
                                    </h2>

                                    <p>
                                        {new Date(
                                            order.createdAt
                                        ).toLocaleDateString()}
                                    </p>
                                </div>

                                <span className="order-status">
                                    {order.status}
                                </span>
                                <div className="order-payment">
    <strong>Payment:</strong>{" "}
    {order.paymentMethod || "Cash on Delivery"}
</div>
                            </div>

                            <div className="order-items">
                                {order.items.map((item, index) => (
                                    <div
                                        className="order-item"
                                        key={index}
                                    >
                                        <div>
                                            <h3>
                                                {item.product?.name ||
                                                    "Product"}
                                            </h3>

                                            <p>
                                                Quantity:{" "}
                                                {item.quantity}
                                            </p>
                                        </div>

                                        <strong>
                                            ₹
                                            {item.price *
                                                item.quantity}
                                        </strong>
                                    </div>
                                ))}
                            </div>

                            <div className="order-total">
                                <span>Total Amount</span>

                                <strong>
                                    ₹{order.totalAmount}
                                </strong>
                            </div>
                            <div className="shipping-address">
    <h3>Delivery Address</h3>

    <p>
        <strong>{order.shippingAddress?.name}</strong>
    </p>

    <p>
        {order.shippingAddress?.address}
    </p>

    <p>
        {order.shippingAddress?.city},{" "}
        {order.shippingAddress?.state} -{" "}
        {order.shippingAddress?.pincode}
    </p>

    <p>
        Phone: {order.shippingAddress?.phone}
    </p>
</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Orders;