import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import { useNavigate, Link } from "react-router-dom";

const Wishlist = () => {
  const { wishlist } = useContext(CartContext);
  const navigate = useNavigate();

  if (wishlist.length === 0) {
    return (
      <div className="container mt-4 text-center">
        <h2 className="text-danger mb-3">Your Wishlist</h2>
        <p>Your wishlist is empty.</p>

        <button
          className="btn btn-outline-danger mt-2"
          onClick={() => navigate("/products")}
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-danger mb-0">Your Wishlist</h2>

        <Link to="/products" className="btn btn-outline-danger">
          Back to Products
        </Link>
      </div>

      {/* Products */}
      <div className="row">
        {wishlist.map((product) => (
          <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;