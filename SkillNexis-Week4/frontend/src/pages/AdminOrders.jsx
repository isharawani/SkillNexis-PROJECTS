import { useEffect, useState } from "react";
import API from "../services/api";
import "./AdminOrders.css";

function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await API.get("/orders", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

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

    useEffect(() => {
        fetchOrders();
    }, []);

    const updateStatus = async (orderId, status) => {
        try {
            const token = localStorage.getItem("token");

            await API.put(
                `/orders/${orderId}/status`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            fetchOrders();
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Unable to update order."
            );
        }
    };

    if (loading) {
        return (
            <div className="admin-orders-page">
                <h1>Admin Orders</h1>
                <p>Loading orders...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="admin-orders-page">
                <h1>Admin Orders</h1>
                <p className="admin-order-error">{error}</p>
            </div>
        );
    }

    return (
        <div className="admin-orders-page">
            <h1>Admin Orders</h1>

            {orders.length === 0 ? (
                <p className="no-orders">
                    No orders found.
                </p>
            ) : (
                <div className="orders-list">
                    {orders.map((order) => (
                        <div
                            className="admin-order-card"
                            key={order._id}
                        >
                            <div className="order-header">
                                <div>
                                    <h2>
                                        Order #
                                        {order._id.slice(-6)}
                                    </h2>

                                    <p>
                                        Customer:{" "}
                                        {order.user?.name}
                                    </p>

                                    <p>
                                        Email:{" "}
                                        {order.user?.email}
                                    </p>
                                </div>

                                <div>
                                    <p>
                                        {new Date(
                                            order.createdAt
                                        ).toLocaleString()}
                                    </p>

                                    <strong>
                                        ₹{order.totalAmount}
                                    </strong>
                                    <p className="admin-payment-method">
    Payment: {order.paymentMethod || "Cash on Delivery"}
</p>
                                </div>
                            </div>

                            <div className="order-items">
                                {order.items.map((item, index) => (
                                    <div
                                        className="order-item"
                                        key={index}
                                    >
                                        <span>
                                            {item.product?.name}
                                        </span>

                                        <span>
                                            Qty: {item.quantity}
                                        </span>

                                        <span>
                                            ₹{item.price}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div className="admin-shipping-address">
    <h3>Delivery Address</h3>

    <p>
        <strong>
            {order.shippingAddress?.name}
        </strong>
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

                            <div className="order-status">
                                <label>
                                    Order Status
                                </label>

                                <select
                                    value={order.status}
                                    onChange={(e) =>
                                        updateStatus(
                                            order._id,
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="Pending">
                                        Pending
                                    </option>

                                    <option value="Processing">
                                        Processing
                                    </option>

                                    <option value="Shipped">
                                        Shipped
                                    </option>

                                    <option value="Delivered">
                                        Delivered
                                    </option>

                                    <option value="Cancelled">
                                        Cancelled
                                    </option>
                                </select>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AdminOrders;