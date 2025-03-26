import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import getProducts from "../../data/products/products.all.js";
import hearing from "../../assets/images/hearing.jpg";
import faith from "../../assets/images/faith.jpg";
import ordered from "../../assets/images/ordered.jpg";
import decisions from "../../assets/images/decisions.jpg";
import LoadingSpinner from "../Loaders/LoadingSpinner.jsx";

function Details() {
  const { id } = useParams();
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
    return <LoadingSpinner />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const product = products.filter((p) => p._id === id)[0];
  console.log(product);

  if (!product) {
    return <p>Product not found.</p>;
  }

  const relatedProducts = products.filter((p) => p._id !== id);

  const image_map = {
    hearing: hearing,
    faith: faith,
    ordered: ordered,
    decisions: decisions,
  };

  return (
    <div className="product-details-container">
      <div className="product-image">
        <img
          src={
            image_map[
              product.product_image.substring(
                product.product_image.lastIndexOf("/") + 1,
                product.product_image.lastIndexOf("."),
              )
            ]
          }
          alt={product.product_title}
        />
      </div>

      <div className="product-info">
        <h1>{product.product_title}</h1>
        <div
          dangerouslySetInnerHTML={{ __html: product.product_description }}
        ></div>
        <div className="ratings">
          <span>⭐</span>
        </div>
        <div className="availability">
          <strong>Availability:</strong> {product.status}
        </div>
        <div className="price">${product.price}</div>
        <button type="button" disabled>
          Add to Cart
        </button>
        <button type="button" disabled>
          Add to Wishlist
        </button>
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
                src={
                  image_map[
                    p.product_image.substring(
                      p.product_image.lastIndexOf("/") + 1,
                      p.product_image.lastIndexOf("."),
                    )
                  ]
                }
                alt={p.product_title}
              />

              <div>
                <h4>{p.product_title}</h4>
                <small
                  dangerouslySetInnerHTML={{
                    __html: p.product_description.substring(0, 50) + "...",
                  }}
                ></small>
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
