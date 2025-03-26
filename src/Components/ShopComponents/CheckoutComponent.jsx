import React, { useState } from "react";

function Checkout() {
  const [checkoutItems] = useState([
    // Example items; replace with your data
    { id: 1, name: "Product 1", price: 50, quantity: 1 },
    { id: 2, name: "Product 2", price: 30, quantity: 2 },
  ]);

  const total = checkoutItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <div className="checkout-items">
        {checkoutItems.map((item) => (
          <div className="checkout-item" key={item.id}>
            <div>{item.name}</div>
            <div>Quantity: {item.quantity}</div>
            <div>Price: ${item.price.toFixed(2)}</div>
            <div>Subtotal: ${(item.price * item.quantity).toFixed(2)}</div>
          </div>
        ))}
      </div>
      <div className="checkout-summary">
        <h2>Total: ${total.toFixed(2)}</h2>
        <button>Proceed to Payment</button>
      </div>
    </div>
  );
}

export default Checkout;
