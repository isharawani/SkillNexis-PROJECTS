const express = require("express");
const Order = require("../models/Order");
const Product = require("../models/Product");
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();


// Create order - logged-in users
router.post("/", protect, async (req, res) => {
    try {
        const {
    items,
    paymentMethod,
    shippingAddress
} = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({
                message: "No items in order"
            });
        }

        let calculatedTotal = 0;
        const orderItems = [];

        // Check products, prices and stock
        for (const item of items) {
            const product = await Product.findById(item.product);

            if (!product) {
                return res.status(404).json({
                    message: "Product not found"
                });
            }

            if (!item.quantity || item.quantity < 1) {
                return res.status(400).json({
                    message: "Invalid quantity"
                });
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({
                    message: `${product.name} has only ${product.stock} items in stock`
                });
            }

            // Calculate total using database price
            calculatedTotal += product.price * item.quantity;

            orderItems.push({
                product: product._id,
                quantity: item.quantity,
                price: product.price
            });
        }

        // Reduce stock
        for (const item of items) {
            const product = await Product.findById(item.product);

            product.stock -= item.quantity;

            await product.save();
        }

        // Create order
       const order = await Order.create({
    user: req.user.id,
    items: orderItems,
    totalAmount: calculatedTotal,
    paymentMethod: paymentMethod || "Cash on Delivery",
    shippingAddress
});

        res.status(201).json(order);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
// Get logged-in user's orders
router.get("/my-orders", protect, async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.user.id
        })
            .populate("items.product")
            .sort({ createdAt: -1 });

        res.json(orders);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Get ALL orders - admin only
router.get("/", protect, admin, async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("user", "name email")
            .populate("items.product")
            .sort({ createdAt: -1 });

        res.json(orders);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Update order status - admin only
router.put("/:id/status", protect, admin, async (req, res) => {
    try {
        const { status } = req.body;

        const allowedStatuses = [
            "Pending",
            "Processing",
            "Shipped",
            "Delivered",
            "Cancelled"
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid order status"
            });
        }

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            {
                new: true,
                runValidators: true
            }
        )
            .populate("user", "name email")
            .populate("items.product");

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;