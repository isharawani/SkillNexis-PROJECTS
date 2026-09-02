import Product from "../components/Product";

function Products() {
  return (
    <div className="page">
      <h2>Products</h2>

      <Product
        name="Wireless Headphones"
        price="₹2,499"
        description="High-quality wireless headphones with clear sound and long battery life."
        inStock={true}
      />
    </div>
  );
}

export default Products;