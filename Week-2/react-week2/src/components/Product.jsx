import { useState } from "react";
import styles from "./Product.module.css";

function Product({ name, price, description, inStock }) {
  const [cartCount, setCartCount] = useState(0);

  function handleAddToCart() {
    setCartCount(cartCount + 1);
  }

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{name}</h2>

      <p className={styles.price}>{price}</p>

      <p>{description}</p>

      <p className={inStock ? "in-stock" : "out-of-stock"}>
        {inStock ? "In Stock" : "Out of Stock"}
      </p>

      <button onClick={handleAddToCart}>Add to Cart</button>

      <p>Added to cart: {cartCount} times</p>
    </div>
  );
}

export default Product;