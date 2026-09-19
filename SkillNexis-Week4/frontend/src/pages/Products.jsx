import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import API from "../services/api";
import "./Products.css";

function Products() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [sort, setSort] = useState("");

    const { addToCart } = useCart();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await API.get("/products");
                setProducts(response.data);
            } catch (error) {
                console.error(error);
                setError("Unable to load products.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const categories = [
        "All",
        ...new Set(products.map((product) => product.category))
    ];

    const filteredProducts = products
        .filter((product) => {
            const matchesSearch = product.name
                .toLowerCase()
                .includes(search.toLowerCase());

            const matchesCategory =
                category === "All" ||
                product.category === category;

            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            if (sort === "low-high") {
                return a.price - b.price;
            }

            if (sort === "high-low") {
                return b.price - a.price;
            }

            return 0;
        });

    const clearFilters = () => {
        setSearch("");
        setCategory("All");
        setSort("");
    };

    if (loading) {
        return (
            <div className="products-page">
                <h1>Our Products</h1>
                <p className="loading">Loading products...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="products-page">
                <h1>Our Products</h1>
                <p className="error">{error}</p>
            </div>
        );
    }

    return (
        <div className="products-page">
            <div className="products-header">
                <h1>Our Products</h1>
                <p>Explore our latest products</p>
            </div>

            {/* Search and Filters */}
            <div className="product-filters">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    {categories.map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>

                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="">Sort by Price</option>
                    <option value="low-high">
                        Price: Low to High
                    </option>
                    <option value="high-low">
                        Price: High to Low
                    </option>
                </select>

                <button
                    className="clear-filter-btn"
                    onClick={clearFilters}
                >
                    Clear
                </button>
            </div>

            {filteredProducts.length === 0 ? (
                <p className="empty">
                    No products found.
                </p>
            ) : (
                <div className="products-grid">
                    {filteredProducts.map((product) => (
                        <div
                            className="product-card"
                            key={product._id}
                        >
                            <div className="product-image-container">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="product-image"
                                />
                            </div>

                            <div className="product-content">
                                <span className="product-category">
                                    {product.category}
                                </span>

                                <h2>{product.name}</h2>

                                <p className="product-description">
                                    {product.description}
                                </p>

                                <div className="product-info">
                                    <span className="product-price">
                                        ₹{product.price}
                                    </span>

                                    <span className="product-stock">
                                        {product.stock > 0
                                            ? `${product.stock} in stock`
                                            : "Out of stock"}
                                    </span>
                                </div>

                                <button
                                    className="add-cart-btn"
                                    disabled={product.stock === 0}
                                    onClick={() =>
                                        addToCart(product)
                                    }
                                >
                                    {product.stock > 0
                                        ? "Add to Cart"
                                        : "Out of Stock"}
                                </button>

                                <Link
                                    to={`/products/${product._id}`}
                                    className="view-details-btn"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Products;