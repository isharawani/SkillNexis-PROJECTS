
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import Orders from "./pages/Orders";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";
import ProductDetails from "./pages/ProductDetails";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import Checkout from "./pages/Checkout";

import { CartProvider } from "./context/CartContext";

function App() {
    return (
        <CartProvider>
            <BrowserRouter>
                <Navbar />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route
    path="/products/:id"
    element={<ProductDetails />}
/>
          <Route element={<AdminRoute />}>
    <Route
        path="/admin/dashboard"
        element={<AdminDashboard />}
    />

    <Route
        path="/admin/products"
        element={<AdminProducts />}
    />

    <Route
        path="/admin/orders"
        element={<AdminOrders />}
    />
    <Route
    path="/checkout"
    element={<Checkout />}
/>
</Route>          

                </Routes>
            </BrowserRouter>
        </CartProvider>
    );
}

export default App;
