import { useEffect, useState, useContext } from "react";
import ProductCard from "../components/ProductCard";
import Sidebar from "../components/Sidebar";
import { CartContext } from "../context/CartContext";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("");

  const { recentlyViewed = [] } = useContext(CartContext);

  useEffect(() => {
    fetch("https://react-ecommerce-backend-paeo.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data || []);

        const uniqueCategories = new Set();
        data?.forEach((p) => {
          if (Array.isArray(p.category)) {
            p.category.forEach((c) => uniqueCategories.add(c));
          } else {
            uniqueCategories.add(p.category);
          }
        });

        setCategories(["All", ...Array.from(uniqueCategories)]);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setProducts([]);
        setCategories(["All"]);
        setLoading(false);
      });
  }, []);

  const handleCategorySelect = (category) => setSelectedCategory(category);

  const processedProducts = products
    .filter((p) => p.name?.toLowerCase().includes(search.toLowerCase()))
    .filter(
      (p) =>
        selectedCategory === "All" ||
        (Array.isArray(p.category)
          ? p.category.includes(selectedCategory)
          : p.category === selectedCategory)
    )
    .sort((a, b) => {
      if (sortOption === "priceLow") return a.price - b.price;
      if (sortOption === "priceHigh") return b.price - a.price;
      if (sortOption === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <div className="container mt-3">
      <div className="row">
        {/* Sidebar */}
        <div className="col-lg-2 col-md-3 mb-4">
          <Sidebar
            onCategorySelect={handleCategorySelect}
            categories={categories}
            products={products}
          />
        </div>

        {/* Main Content */}
        <div className="col-lg-10 col-md-9">
          <h2 className="mb-3 text-danger">Products</h2>

          {/* Search */}
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Sort */}
          <select
            className="form-select mb-3"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
            <option value="name">Name (A-Z)</option>
          </select>

          {/* Products Grid */}
          <div className="row">
            {loading
              ? Array(8)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      className="col-lg-3 col-md-4 col-sm-6 mb-4"
                      key={i}
                    >
                      <div className="card p-3">
                        <Skeleton height={180} />
                        <div className="mt-2">
                          <Skeleton height={20} />
                          <Skeleton height={15} width="60%" />
                        </div>
                      </div>
                    </div>
                  ))
              : processedProducts.length > 0 ? (
                  processedProducts.map((product) => (
                    <div
                      className="col-lg-3 col-md-4 col-sm-6 mb-4"
                      key={product.id}
                    >
                      <ProductCard product={product} />
                    </div>
                  ))
                ) : (
                  <h5 className="text-center">No products found.</h5>
                )}
          </div>

          {/* Recently Viewed Products */}
          {recentlyViewed.length > 0 && (
            <div className="mt-5 position-relative">
              <h4 className="mb-3 text-danger">Recently Viewed</h4>

              <div
                id="recentlyViewedContainer"
                className="d-flex overflow-auto pb-2"
                style={{ gap: "1rem", scrollBehavior: "smooth" }}
              >
                {recentlyViewed.map((product) => (
                  <div
                    key={product.id}
                    className="flex-shrink-0"
                    style={{ width: "200px" }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;