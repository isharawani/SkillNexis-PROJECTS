import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import { useCart } from "../context/CartContext";
import "./ProductDetails.css";

function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await API.get(`/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error(error);
                setError(
                    error.response?.data?.message ||
                    "Unable to load product."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        addToCart(product);
        alert("Product added to cart!");
    };

    if (loading) {
        return (
            <div className="product-details-page">
                <p>Loading product...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="product-details-page">
                <p className="product-error">{error}</p>
                <button onClick={() => navigate("/products")}>
                    Back to Products
                </button>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="product-details-page">
                <p>Product not found.</p>
            </div>
        );
    }

    return (
        <div className="product-details-page">
            <button
                className="back-btn"
                onClick={() => navigate("/products")}
            >
                ← Back to Products
            </button>

            <div className="product-details-card">
                <div className="product-details-image">
                    <img
                        src={product.image}
                        alt={product.name}
                    />
                </div>

                <div className="product-details-content">
                    <span className="product-category">
                        {product.category}
                    </span>

                    <h1>{product.name}</h1>

                    <p className="product-description">
                        {product.description}
                    </p>

                    <h2>₹{product.price}</h2>

                    <p className="product-stock">
                        {product.stock > 0
                            ? `In Stock: ${product.stock}`
                            : "Out of Stock"}
                    </p>

                    <button
                        className="add-details-cart-btn"
                        onClick={handleAddToCart}
                        disabled={product.stock <= 0}
                    >
                        {product.stock > 0
                            ? "Add to Cart"
                            : "Out of Stock"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;