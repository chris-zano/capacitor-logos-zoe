import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import getProducts from "../../data/products/products.all.js";

function Details() {
    const { id} = useParams();
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
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

   
    const product = products.filter((p) => p._id === id)[0];
    console.log(product);

    if (!product) {
        return <p>Product not found.</p>;
    }

   
    const relatedProducts = products.filter(
        (p) =>  p._id !== id
    );

    return (
        <div className="product-details-container">
            <div className="product-image">
                <img
                    src={`/src/assets${product.product_image}`}
                    alt={product.product_title}
                />
            </div>

            <div className="product-info">
                <h1>{product.product_title}</h1>
                <div dangerouslySetInnerHTML={{__html: product.product_description}}></div>
                <div className="ratings">
                    <span>⭐</span>
                </div>
                <div className="availability">
                    <strong>Availability:</strong> {product.status}
                </div>
                <div className="price">${product.price}</div>
                <button>Add to Cart</button>
                <button>Add to Wishlist</button>
            </div>

            <div className="related-products">
                <h3>Related Products</h3>
                <div className="related-products-container">
                    {relatedProducts.map((p) => (
                        <NavLink
                            to={`details/${p._id}`}
                            className="related-product-card"
                            key={p._id}
                        >
                            <img
                                src={`/src/assets${p.product_image}`}
                                alt={p.product_title}
                            />
                            <div>
                                <h4>{p.product_title}</h4>
                                <small dangerouslySetInnerHTML={{__html: p.product_description.substring(0,50)+ '...'}}>
                                </small>
                                <span>${p.price}</span>
                            </div>
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Details;
