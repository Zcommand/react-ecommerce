// src/components/ProductCard.jsx
import { useContext } from "react";
import { CartContext } from "../context/CartContext.jsx";

const ProductCard = ({ product }) => {
  const {
    addToCart,
    addToWishlist,
    removeFromWishlist,
    wishlist,
    addToCompare,
    removeFromCompare,
    compareList,
    addToRecentlyViewed,
  } = useContext(CartContext);

  const inWishlist = wishlist.some((item) => item.id === product.id);
  const inCompare = compareList.some((item) => item.id === product.id);

  // Handle compare with limit of 2
  const handleCompare = (e) => {
    e.stopPropagation();
    if (!inCompare && compareList.length >= 2) {
      alert("You can only compare 2 products at a time.");
      return;
    }
    inCompare ? removeFromCompare(product.id) : addToCompare(product);
  };

  // Add to recently viewed
  const handleView = () => {
    addToRecentlyViewed(product);
  };

  return (
    <div
      className="card h-100 shadow-sm"
      onClick={handleView}
      style={{ cursor: "pointer" }}
    >
      <img
        src={product.image}
        className="card-img-top p-3"
        alt={product.name}
        style={{ objectFit: "contain", height: "180px" }}
      />

      <div className="card-body d-flex flex-column">
        <h5
          className="card-title text-truncate"
          title={product.name}
          style={{ minHeight: "3em" }}
        >
          {product.name}
        </h5>

        {/* Star Rating */}
        <div className="mb-2 text-warning">
          {"★".repeat(product.rating)}
          {"☆".repeat(5 - product.rating)}
        </div>

        <p className="card-text text-danger fw-bold mb-3">
          ₱{product.price}
        </p>

        <div className="d-flex gap-2 mt-auto flex-wrap">
          {/* Add to Cart */}
          <button
            className="btn btn-warning flex-fill d-flex align-items-center justify-content-center"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
          >
            <i className="fa fa-cart-plus me-1"></i> Add to Cart
          </button>

          {/* Wishlist */}
          <button
            className={`btn flex-fill d-flex align-items-center justify-content-center ${
              inWishlist ? "btn-danger" : "btn-outline-danger"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              inWishlist
                ? removeFromWishlist(product.id)
                : addToWishlist(product);
            }}
          >
            <i className="fa fa-heart me-1"></i>
            {inWishlist ? "Remove" : "Wishlist"}
          </button>

          {/* Compare */}
          <button
            className={`btn flex-fill d-flex align-items-center justify-content-center ${
              inCompare ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={handleCompare}
          >
            <i className="fa fa-exchange-alt me-1"></i>
            {inCompare ? "Remove" : "Compare"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;