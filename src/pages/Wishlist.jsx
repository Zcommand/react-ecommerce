// src/pages/Wishlist.jsx
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const { wishlist } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div className="container mt-3">
      <h2 className="mb-4 text-danger">Your Wishlist</h2>

      {wishlist.length === 0 ? (
        <p className="text-center">Your wishlist is empty.</p>
      ) : (
        <div className="row">
          {wishlist.map((product) => (
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-3">
        <button
          className="btn btn-outline-danger"
          onClick={() => navigate("/products")}
        >
          ← Back to Products
        </button>
      </div>
    </div>
  );
};

export default Wishlist;