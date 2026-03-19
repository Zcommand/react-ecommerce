import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import ProductCard from "./ProductCard";

const RecentlyViewed = () => {
  const { recentlyViewed } = useContext(CartContext);

  if (recentlyViewed.length === 0) return null;

  return (
    <div className="container mt-4">
      <h4 className="text-danger mb-3">Recently Viewed Products</h4>
      <div className="row">
        {recentlyViewed.map((product) => (
          <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewed;