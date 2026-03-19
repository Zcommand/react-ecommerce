import { Link } from "react-router-dom";

import blog1 from "/src/assets/images/product2.jpg";
import blog2 from "/src/assets/images/product1.jpg";

const Blog = () => {
  return (
    <div className="container my-4">
      <div className="row">
        {/* MAIN CONTENT */}
        <div className="col-lg-8">
          {/* Blog Card 1 – Lenovo LOQ */}
          <div className="card mb-4 shadow-sm">
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={blog1}
                  className="img-fluid h-100 object-fit-cover rounded-start"
                  alt="Lenovo LOQ Gaming Laptop"
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">
                    Lenovo LOQ: Budget-Friendly Gaming Power
                  </h5>

                  <p className="card-text mb-2">
                    Lenovo LOQ is designed for students and casual gamers who
                    want reliable performance without the premium price.
                  </p>

                  <ul className="small text-muted mb-2">
                    <li>Intel Core i5 / Ryzen 5 processors</li>
                    <li>NVIDIA RTX 3050 up to RTX 5060 GPU options</li>
                    <li>Clean design suitable for school or work</li>
                  </ul>

                  <small className="text-muted">January 17, 2026</small>
                </div>
              </div>
            </div>
          </div>

          {/* Article – LOQ */}
          <article className="mb-5">
            <h3>Why Lenovo LOQ Is Worth It</h3>
            <p className="text-muted">Entry-level to Mid-range Gaming Laptop</p>
            <p>
              The Lenovo LOQ series is built for everyday productivity and
              casual gaming. It commonly comes with Intel Core i5 or Ryzen 5
              processors paired with RTX 3050 or RTX 5060 GPUs.
            </p>
            <p>
              With a clean design and efficient cooling, LOQ is ideal for
              school, work, and gaming after hours.
            </p>
          </article>

          {/* Blog Card 2 – Legion */}
          <div className="card mb-4 shadow-sm">
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={blog2}
                  className="img-fluid h-100 object-fit-cover rounded-start"
                  alt="Lenovo Legion Gaming Laptop"
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">
                    Lenovo Legion: Built for Performance
                  </h5>
                  <p className="card-text">
                    Lenovo Legion is designed for serious gamers who want higher
                    FPS, stronger cooling, and premium build quality.

                    You can find Legion models with Intel Core i7/i9 or Ryzen 7/9.

                    <br />

                    You can checkout Dino Cornel's collection, just be prepared, more of a flexer than reviewer
                  </p>

                  <ul className="small text-muted mb-2">
                    <li>Intel Core i9 / Ryzen 9 processors</li>
                    <li>NVIDIA RTX 3050 up to RTX 5090 GPU options</li>
                    <li>Clean design suitable for school or work</li>
                  </ul>

                  <small className="text-muted">January 15, 2026</small>
                </div>
              </div>
            </div>
          </div>

          {/* Article – Legion */}
          <article className="mb-4">
            <h3>Why Choose Lenovo Legion?</h3>
            <p>
              Legion laptops feature advanced Legion ColdFront cooling, high
              refresh-rate displays, and powerful GPUs like RTX 4060 and RTX
              5090.
            </p>
            <p>
              If you play AAA games, stream, or do heavy creative work, Legion
              delivers consistent performance under load.
            </p>
          </article>

          {/* Back Button */}
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Find Your Perfect Lenovo</h5>
              <p className="card-text">
                Compare LOQ and Legion models available in our store.
              </p>
              <Link to="/" className="btn btn-danger">
                Browse Lenovo Laptops
              </Link>
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="col-lg-4">
          <h5 className="mb-3">Related Topics</h5>

          <div className="list-group shadow-sm">
            <div className="list-group-item list-group-item-danger">
              <h6 className="mb-1">Lenovo LOQ vs Legion</h6>
              <small>Which one suits you?</small>
            </div>

            <div className="list-group-item">
              <h6 className="mb-1">RTX 3050 vs RTX 4050</h6>
              <small className="text-muted">Gaming Performance</small>
            </div>

            <div className="list-group-item">
              <h6 className="mb-1">Cooling & Thermals</h6>
              <small className="text-muted">LOQ vs Legion</small>
            </div>

            <div className="list-group-item">
              <h6 className="mb-1">Best Laptops for Students</h6>
              <small className="text-muted">Gaming & Productivity</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
