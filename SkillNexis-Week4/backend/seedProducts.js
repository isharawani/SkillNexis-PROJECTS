require("dotenv").config();
const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const mongoose = require("mongoose");
const Product = require("./models/Product");

const products = [
    {
        name: "Wireless Headphones",
        description: "Comfortable wireless headphones with clear sound.",
        price: 1499,
        category: "Electronics",
        image: "https://via.placeholder.com/300",
        stock: 20
    },
    {
        name: "Smart Watch",
        description: "Smart watch with fitness and activity tracking.",
        price: 2499,
        category: "Electronics",
        image: "https://via.placeholder.com/300",
        stock: 15
    },
    {
        name: "Laptop Backpack",
        description: "Durable backpack suitable for laptops and daily use.",
        price: 999,
        category: "Accessories",
        image: "https://via.placeholder.com/300",
        stock: 30
    },
    {
        name: "Running Shoes",
        description: "Lightweight running shoes for everyday workouts.",
        price: 1999,
        category: "Fashion",
        image: "https://via.placeholder.com/300",
        stock: 25
    }
];

const seedProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        await Product.deleteMany();

        await Product.insertMany(products);

        console.log("Products added successfully");

        await mongoose.connection.close();
    } catch (error) {
        console.error("Error:", error.message);
    }
};

seedProducts();