import { useEffect, useState } from "react";
import API from "../services/api";
import "./AdminProducts.css";

function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
        stock: ""
    });

    const [editingId, setEditingId] = useState(null);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const token = localStorage.getItem("token");

    const fetchProducts = async () => {
        try {
            const response = await API.get("/products");
            setProducts(response.data);
        } catch (error) {
            setError("Unable to load products.");
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const resetForm = () => {
        setFormData({
            name: "",
            description: "",
            price: "",
            category: "",
            image: "",
            stock: ""
        });

        setEditingId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            if (editingId) {
                await API.put(
                    `/products/${editingId}`,
                    formData,
                    config
                );

                setMessage("Product updated successfully.");
            } else {
                await API.post(
                    "/products",
                    formData,
                    config
                );

                setMessage("Product added successfully.");
            }

            resetForm();
            fetchProducts();
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Operation failed."
            );
        }
    };

    const handleEdit = (product) => {
        setEditingId(product._id);

        setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            image: product.image,
            stock: product.stock
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const handleDelete = async (productId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            await API.delete(
                `/products/${productId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setMessage("Product deleted successfully.");

            fetchProducts();
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Unable to delete product."
            );
        }
    };

    return (
        <div className="admin-page">
            <h1>Admin Product Management</h1>

            <div className="admin-form-card">
                <h2>
                    {editingId
                        ? "Edit Product"
                        : "Add New Product"}
                </h2>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Product name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        name="description"
                        placeholder="Product description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="image"
                        placeholder="Image URL"
                        value={formData.image}
                        onChange={handleChange}
                    />

                    <input
                        type="number"
                        name="stock"
                        placeholder="Stock"
                        value={formData.stock}
                        onChange={handleChange}
                        required
                    />

                    <div className="form-buttons">
                        <button type="submit">
                            {editingId
                                ? "Update Product"
                                : "Add Product"}
                        </button>

                        {editingId && (
                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={resetForm}
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>

                {message && (
                    <p className="admin-success">
                        {message}
                    </p>
                )}

                {error && (
                    <p className="admin-error">
                        {error}
                    </p>
                )}
            </div>

            <div className="admin-products">
                <h2>All Products</h2>

                <div className="admin-product-grid">
                    {products.map((product) => (
                        <div
                            className="admin-product-card"
                            key={product._id}
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                            />

                            <div className="admin-product-content">
                                <h3>{product.name}</h3>

                                <p>
                                    {product.description}
                                </p>

                                <strong>
                                    ₹{product.price}
                                </strong>

                                <span>
                                    Stock: {product.stock}
                                </span>

                                <div className="admin-actions">
                                    <button
                                        onClick={() =>
                                            handleEdit(product)
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={() =>
                                            handleDelete(
                                                product._id
                                            )
                                        }
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AdminProducts;