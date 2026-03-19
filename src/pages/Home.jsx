// src/pages/Home.jsx
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import * as bootstrap from "bootstrap";
import ProductCard from "../components/ProductCard";
import { CartContext } from "../context/CartContext";

import slide1 from "../assets/images/item2.svg";
import slide2 from "../assets/images/item1.svg";
import slide3 from "../assets/images/item3.svg";

const Home = () => {
  const [products, setProducts] = useState([]);
  const { recentlyViewed = [] } = useContext(CartContext); // default empty array

  // Fetch featured products
  useEffect(() => {
    fetch("https://react-ecommerce-backend-paeo.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (!data || !Array.isArray(data)) return;
        const featured = data.slice(0, 4).map((item) => ({
          ...item,
          oldPrice: item.oldPrice || (item.price * 1.25).toFixed(2),
          image: item.image || "placeholder.png", // fallback image
        }));
        setProducts(featured);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Initialize carousel
  useEffect(() => {
    const carouselElement = document.querySelector("#carouselExampleCaptions");
    if (carouselElement) {
      new bootstrap.Carousel(carouselElement, {
        interval: 3000,
        ride: "carousel",
      });
    }
  }, []);

  return (
    <div className="container">
      {/* ===== CAROUSEL ===== */}
      <div id="carouselExampleCaptions" className="carousel slide mb-4">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
          ></button>
        </div>

        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={slide1} className="d-block w-100" alt="Slide 1" />
          </div>
          <div className="carousel-item">
            <img src={slide2} className="d-block w-100" alt="Slide 2" />
          </div>
          <div className="carousel-item">
            <img src={slide3} className="d-block w-100" alt="Slide 3" />
          </div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" />
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" />
        </button>
      </div>
      {/* ===== END CAROUSEL ===== */}

      {/* Featured Products */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Featured Products</h2>
        <Link to="/products" className="btn btn-outline-danger">
          View More Products
        </Link>
      </div>

      <div className="row">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <p>No featured products available.</p>
        )}
      </div>

      {/* Recently Viewed Products */}
      {recentlyViewed.length > 0 && (
        <div className="mt-5">
          <h4 className="text-danger mb-3">Recently Viewed Products</h4>
          <div
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
  );
};

export default Home;
