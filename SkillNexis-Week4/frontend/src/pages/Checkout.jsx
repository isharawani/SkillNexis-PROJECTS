import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import API from "../services/api";
import "./Checkout.css";

function Checkout() {
    const {
        cart,
        cartTotal,
        clearCart
    } = useCart();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "Cash on Delivery"
});

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please login before placing an order.");
            navigate("/login");
            return;
        }

        if (cart.length === 0) {
            alert("Your cart is empty.");
            navigate("/products");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const orderItems = cart.map((item) => ({
                product: item._id,
                quantity: item.quantity
            }));

            await API.post(
    "/orders",
    {
        items: orderItems,
        paymentMethod: formData.paymentMethod,
        shippingAddress: {
            name: formData.name,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode
        }
    },
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
);

            clearCart();

            alert("Order placed successfully! 🎉");

            navigate("/orders");
        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.message ||
                "Unable to place order."
            );
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="checkout-page">
                <div className="empty-checkout">
                    <h1>Your Cart is Empty 🛒</h1>

                    <p>
                        Add products before proceeding to checkout.
                    </p>

                    <button
                        onClick={() => navigate("/products")}
                    >
                        Browse Products
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-page">

            <div className="checkout-header">
                <h1>Checkout</h1>

                <p>
                    Complete your details to place your order.
                </p>
            </div>

            <div className="checkout-container">

                {/* Customer Details */}

                <div className="checkout-form-section">

                    <h2>Delivery Details</h2>

                    <form onSubmit={handlePlaceOrder}>

                        <div className="form-group">
                            <label>
                                Full Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                Phone Number
                            </label>

                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Enter phone number"
                                pattern="[0-9]{10}"
                                maxLength="10"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                Address
                            </label>

                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Enter your full address"
                                rows="4"
                                required
                            />
                        </div>

                        <div className="form-row">

                            <div className="form-group">
                                <label>
                                    City
                                </label>

                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="City"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    State
                                </label>

                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    placeholder="State"
                                    required
                                />
                            </div>

                        </div>

                        <div className="form-group">
                            <label>
                                PIN Code
                            </label>

                            <input
                                type="text"
                                name="pincode"
                                value={formData.pincode}
                                onChange={handleChange}
                                placeholder="6-digit PIN code"
                                pattern="[0-9]{6}"
                                maxLength="6"
                                required
                            />
                        </div>
                        <div className="payment-section">
    <h3>Payment Method</h3>

    <label className="payment-option">
        <input
            type="radio"
            name="paymentMethod"
            value="Cash on Delivery"
            checked={
                formData.paymentMethod ===
                "Cash on Delivery"
            }
            onChange={handleChange}
        />

        <span>Cash on Delivery</span>
    </label>

    <label className="payment-option">
        <input
            type="radio"
            name="paymentMethod"
            value="UPI"
            checked={
                formData.paymentMethod === "UPI"
            }
            onChange={handleChange}
        />

        <span>UPI / Online Payment</span>
    </label>
</div>

                        {error && (
                            <p className="checkout-error">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="place-order-btn"
                            disabled={loading}
                        >
                            {loading
                                ? "Placing Order..."
                                : "Place Order"}
                        </button>

                    </form>

                </div>


                {/* Order Summary */}

                <div className="checkout-summary">

                    <h2>Order Summary</h2>

                    <div className="checkout-items">

                        {cart.map((item) => (
                            <div
                                className="checkout-item"
                                key={item._id}
                            >

                                <img
                                    src={item.image}
                                    alt={item.name}
                                />

                                <div>
                                    <h3>
                                        {item.name}
                                    </h3>

                                    <p>
                                        Qty: {item.quantity}
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

                    <hr />

                    <div className="summary-row">
                        <span>
                            Items
                        </span>

                        <span>
                            {cart.reduce(
                                (total, item) =>
                                    total +
                                    item.quantity,
                                0
                            )}
                        </span>
                    </div>

                    <div className="summary-row">
                        <span>
                            Delivery
                        </span>

                        <span>
                            Free
                        </span>
                    </div>

                    <div className="summary-total">
                        <span>
                            Total
                        </span>

                        <span>
                            ₹{cartTotal}
                        </span>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Checkout;