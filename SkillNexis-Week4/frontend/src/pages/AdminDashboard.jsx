import { useEffect, useState } from "react";
import API from "../services/api";
import "./AdminDashboard.css";

function AdminDashboard() {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const token = localStorage.getItem("token");

                const headers = {
                    Authorization: `Bearer ${token}`
                };

                const [productsResponse, ordersResponse] =
                    await Promise.all([
                        API.get("/products"),
                        API.get("/orders", { headers })
                    ]);

                setProducts(productsResponse.data);
                setOrders(ordersResponse.data);
            } catch (error) {
                console.error(error);

                setError(
                    error.response?.data?.message ||
                    "Unable to load dashboard."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const totalSales = orders.reduce(
        (total, order) => total + order.totalAmount,
        0
    );

    const recentOrders = orders.slice(0, 5);

    if (loading) {
        return (
            <div className="admin-dashboard-page">
                <h1>Admin Dashboard</h1>
                <p>Loading dashboard...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="admin-dashboard-page">
                <h1>Admin Dashboard</h1>
                <p className="dashboard-error">{error}</p>
            </div>
        );
    }

    return (
        <div className="admin-dashboard-page">
            <div className="dashboard-header">
                <h1>Admin Dashboard</h1>
                <p>Overview of your e-commerce store</p>
            </div>

            <div className="dashboard-stats">
                <div className="stat-card">
                    <h3>Total Products</h3>
                    <p>{products.length}</p>
                </div>

                <div className="stat-card">
                    <h3>Total Orders</h3>
                    <p>{orders.length}</p>
                </div>

                <div className="stat-card">
                    <h3>Total Sales</h3>
                    <p>₹{totalSales}</p>
                </div>

                <div className="stat-card">
                    <h3>Products in Stock</h3>
                    <p>
                        {products.reduce(
                            (total, product) =>
                                total + product.stock,
                            0
                        )}
                    </p>
                </div>
            </div>

            <div className="recent-orders-section">
                <h2>Recent Orders</h2>

                {recentOrders.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    <div className="dashboard-orders">
                        {recentOrders.map((order) => (
                            <div
                                className="dashboard-order-card"
                                key={order._id}
                            >
                                <div>
                                    <h3>
                                        Order #
                                        {order._id.slice(-6)}
                                    </h3>

                                    <p>
                                        Customer:{" "}
                                        {order.user?.name ||
                                            "Unknown"}
                                    </p>

                                    <p>
                                        {new Date(
                                            order.createdAt
                                        ).toLocaleString()}
                                    </p>
                                </div>

                                <div className="dashboard-order-right">
                                    <strong>
                                        ₹{order.totalAmount}
                                    </strong>

                                    <span
                                        className={`status-${order.status.toLowerCase()}`}
                                    >
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminDashboard;