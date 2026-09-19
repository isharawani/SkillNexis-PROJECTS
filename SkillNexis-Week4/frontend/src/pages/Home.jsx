import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
    return (
        <div className="home-page">

            {/* Hero Section */}
            <section className="hero-section">

                <div className="hero-content">
                    <span className="hero-badge">
                        Pick The Best , Shop The Rest!
                    </span>

                    <h1>
                        Welcome to{" "}
                        <span>|3ELEVEN||</span>
                    </h1>

                    <p>
                        Discover quality products, great deals,
                        and a smooth shopping experience — all in
                        one place.
                    </p>

                    <div className="hero-buttons">
                        <Link
                            to="/products"
                            className="shop-btn"
                        >
                            Shop Now 🛍️
                        </Link>

                        <Link
                            to="/products"
                            className="explore-btn"
                        >
                            Explore Products
                        </Link>
                    </div>
                </div>

                <div className="hero-visual">

                    <div className="hero-circle">
                        |||
                    </div>

                    <div className="matcha-cup">
                        🛍️
                    </div>

                    <div className="floating-card card-one">
                        ✨ Quality Products
                    </div>

                    <div className="floating-card card-two">
                        🚚 Easy Shopping
                    </div>

                </div>

            </section>

            {/* Features */}
            <section className="features-section">

                <div className="feature-card">
                    <div className="feature-icon">
                        🛍️
                    </div>

                    <h3>
                        Wide Collection
                    </h3>

                    <p>
                        Explore products across different
                        categories.
                    </p>
                </div>

                <div className="feature-card">
                    <div className="feature-icon">
                        🚚
                    </div>

                    <h3>
                        Fast Delivery
                    </h3>

                    <p>
                        Simple and convenient order experience.
                    </p>
                </div>

                <div className="feature-card">
                    <div className="feature-icon">
                        🔒
                    </div>

                    <h3>
                        Secure Shopping
                    </h3>

                    <p>
                        Your orders are handled securely.
                    </p>
                </div>

                <div className="feature-card">
                    <div className="feature-icon">
                        💚
                    </div>

                    <h3>
                        Easy Checkout
                    </h3>

                    <p>
                        Quick checkout with flexible payment
                        options.
                    </p>
                </div>

            </section>

            {/* CTA */}
            <section className="home-cta">

                <div>
                    <span>
                         Ready to shop?
                    </span>

                    <h2>
                        Find something you'll love.
                    </h2>

                    <p>
                        Browse our collection and discover
                        your next favorite product.
                    </p>
                </div>

                <Link
                    to="/products"
                    className="cta-btn"
                >
                    Browse Products →
                </Link>

            </section>

        </div>
    );
}

export default Home;