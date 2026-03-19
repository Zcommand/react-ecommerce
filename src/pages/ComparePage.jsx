// src/pages/ComparePage.jsx
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const ComparePage = () => {
  const { compareList, addToCart, removeFromCompare } = useContext(CartContext);

  if (compareList.length === 0) {
    return (
      <div className="container mt-4">
        <h2 className="text-danger mb-3">Compare Products</h2>
        <p>You have no products to compare.</p>
        <Link to="/products" className="btn btn-outline-danger">
          Back to Products
        </Link>
      </div>
    );
  }

  // Extract keys to compare dynamically (except id, image, price)
  const featureKeys = Object.keys(compareList[0]).filter(
    (key) => !["id", "image", "price", "name"].includes(key)
  );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-danger">Compare Products</h2>
        <Link to="/products" className="btn btn-outline-danger">
          Back to Products
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered text-center align-middle">
          <thead className="table-danger">
            <tr>
              <th>Feature</th>
              {compareList.map((product) => (
                <th key={product.id}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ height: "120px", objectFit: "cover" }}
                    className="mb-2"
                  />
                  <div className="fw-bold">{product.name}</div>
                  <div className="text-danger fw-bold">₱{product.price.toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  <div className="mt-2 d-flex justify-content-center gap-2">
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => removeFromCompare(product.id)}
                    >
                      Remove
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {featureKeys.map((key) => (
              <tr key={key}>
                <td className="fw-bold text-start">{key}</td>
                {compareList.map((product) => (
                  <td key={product.id}>{product[key] || "-"}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparePage;