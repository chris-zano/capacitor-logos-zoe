import React, { useState, useEffect } from "react";
import getProducts from "../../data/products/products.all.js";
import { NavLink } from "react-router-dom";

function Landing() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);
                const data = await getProducts();
                setProducts(data);
            } catch (err) {
                setError("Failed to load products. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    if (loading) {
        return <p>Loading products...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <section className="shop_container">
            {products.map((product) => (
                <div className="shop-item-card" key={product._id}>
                    <NavLink to={`details/${product._id}/`}>
                        <img
                            src={`/src/assets${product.product_image}`}
                            alt={product.product_title}
                        />
                        <div>
                            <h3>{product.product_title}</h3>
                            <div dangerouslySetInnerHTML={{__html:product.product_description.substring(0, 100)}} >
                            </div>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <button type="button">
                                    {product.status === "pre-order"
                                        ? "Pre-order"
                                        : "Coming Soon"}
                                </button>
                            </div>
                        </div>
                    </NavLink>
                </div>
            ))}
        </section>
    );
}

export default Landing;
