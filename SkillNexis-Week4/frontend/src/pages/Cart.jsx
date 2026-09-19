import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Cart.css";

function Cart() {
    const {
        cart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        cartTotal
    } = useCart();

    const navigate = useNavigate();

    if (cart.length === 0) {
        return (
            <div className="cart-page">
                <div className="empty-cart">
                    <h1>Your Cart is Empty 🛒</h1>

                    <p>
                        Add some products to your cart to
                        continue shopping.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">

            <div className="cart-header">
                <h1>Shopping Cart</h1>

                <button
                    className="clear-cart-btn"
                    onClick={clearCart}
                >
                    Clear Cart
                </button>
            </div>

            <div className="cart-container">

                {/* Cart Items */}

                <div className="cart-items">

                    {cart.map((item) => (
                        <div
                            className="cart-item"
                            key={item._id}
                        >

                            <img
                                src={item.image}
                                alt={item.name}
                                className="cart-item-image"
                            />

                            <div className="cart-item-details">

                                <h2>
                                    {item.name}
                                </h2>

                                <p>
                                    {item.category}
                                </p>

                                <span className="cart-item-price">
                                    ₹{item.price}
                                </span>

                                <div className="quantity-controls">

                                    <button
                                        onClick={() =>
                                            decreaseQuantity(
                                                item._id
                                            )
                                        }
                                    >
                                        −
                                    </button>

                                    <span>
                                        {item.quantity}
                                    </span>

                                    <button
                                        onClick={() =>
                                            increaseQuantity(
                                                item._id
                                            )
                                        }
                                    >
                                        +
                                    </button>

                                    {item.quantity >= item.stock &&
                                        item.stock > 0 && (
                                            <small className="stock-limit-message">
                                                Maximum stock reached
                                            </small>
                                        )}

                                </div>

                            </div>

                            <div className="cart-item-right">

                                <p className="item-total">
                                    ₹
                                    {item.price *
                                        item.quantity}
                                </p>

                                <button
                                    className="remove-btn"
                                    onClick={() =>
                                        removeFromCart(
                                            item._id
                                        )
                                    }
                                >
                                    Remove
                                </button>

                            </div>

                        </div>
                    ))}

                </div>


                {/* Order Summary */}

                <div className="cart-summary">

                    <h2>
                        Order Summary
                    </h2>

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
                            Subtotal
                        </span>

                        <span>
                            ₹{cartTotal}
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

                    <hr />

                    <div className="summary-total">

                        <span>
                            Total
                        </span>

                        <span>
                            ₹{cartTotal}
                        </span>

                    </div>


                    {/* Checkout */}

                    <button
                        className="checkout-btn"
                        onClick={() => {
                            const token =
                                localStorage.getItem(
                                    "token"
                                );

                            if (!token) {
                                alert(
                                    "Please login before checkout."
                                );

                                navigate("/login");

                                return;
                            }

                            navigate("/checkout");
                        }}
                    >
                        Proceed to Checkout
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Cart;