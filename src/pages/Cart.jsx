// src/pages/Cart.jsx
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, increaseQty, decreaseQty, clearCart } =
    useContext(CartContext); // fixed typo

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const formatPrice = (value) =>
    value.toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  if (cart.length === 0) {
    return (
      <div className="container my-5">
        <h2 className="mb-4 text-danger">🛒 Shopping Cart</h2>
        <div className="alert alert-danger text-center">
          Your cart is empty. Bili na! <Link to="/products">Shop Now</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-danger">🛒 Shopping Cart</h2>

      {cart.map((item) => (
        <div key={item.id} className="card mb-3 shadow-sm">
          <div className="card-body">
            <div className="row align-items-center">
              {/* Product Image */}
              <div className="col-12 col-md-2 text-center mb-3 mb-md-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="img-fluid rounded"
                  style={{ width: "80px", height: "80px", objectFit: "cover" }}
                />
              </div>

              {/* Product Name & Price */}
              <div className="col-12 col-md-3 mb-3 mb-md-0">
                <h5 className="mb-1">{item.name}</h5>
                <small className="text-muted">₱{formatPrice(item.price)}</small>
              </div>

              {/* Quantity Controls */}
              <div className="col-12 col-md-4 mb-3 mb-md-0 text-center">
                <div className="d-flex justify-content-center align-items-center">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="btn btn-outline-secondary btn-sm"
                  >
                    -
                  </button>
                  <span className="mx-3 fw-bold">{item.qty}</span>
                  <button
                    onClick={() => increaseQty(item.id)}
                    className="btn btn-outline-secondary btn-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Remove Button */}
              <div className="col-12 col-md-3 text-center text-md-end">
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="btn btn-outline-danger btn-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Total & Actions */}
      <div className="card shadow mt-4">
        <div className="card-body d-flex flex-column flex-md-row justify-content-between align-items-center">
          <h4 className="mb-3 mb-md-0">Total: ₱{formatPrice(total)}</h4>

          <div className="d-flex flex-column flex-md-row gap-2">
            <button
              onClick={() => {
                if (confirm("Remove all items from cart?")) clearCart();
              }}
              className="btn btn-danger"
            >
              Remove All
            </button>

            <Link to="/checkout" className="btn btn-success btn-lg">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;