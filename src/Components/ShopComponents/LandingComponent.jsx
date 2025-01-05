import React, { useState, useEffect } from "react";
import getProducts from "../../data/products/products.all.js";
import { NavLink } from "react-router-dom";
import hearing from "../../assets/images/hearing.jpg";
import faith from "../../assets/images/faith.jpg";
import ordered from "../../assets/images/ordered.jpg";
import decisions from "../../assets/images/decisions.jpg";


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

    const image_map = {
        "hearing": hearing,
        "faith": faith,
        "ordered": ordered,
        "decisions": decisions
    }

    return (
        <section className="shop_container">
            {products.map((product) => (
                <div className="shop-item-card" key={product._id}>
                    <NavLink to={`details/${product._id}/`}>
                        <img
                            src={
                                image_map[
                                    product.product_image.substring(
                                        product.product_image.lastIndexOf("/") + 1,
                                        product.product_image.lastIndexOf(".")
                                    )
                                ]
                            }
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
