import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-4 mt-5">
      <div className="container">
        <div className="row text-center text-md-start">
          {/* About */}
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">My E-commerce Site</h5>
            <p className="small text-secondary">
              @2026 Advanced Web Design. Technical Assessment.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-3">
            <h6 className="fw-bold">Quick Links</h6>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-secondary text-decoration-none">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-secondary text-decoration-none">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-secondary text-decoration-none">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/policies" className="text-secondary text-decoration-none">
                  Policies
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-md-4 mb-3">
            <h6 className="fw-bold text-center text-md-start mb-3">Follow Us</h6>

            <div className="d-flex gap-2 mt-2 justify-content-center justify-content-md-start">
              <i className="fab fa-facebook fa-lg text-secondary"></i>
              <i className="fab fa-twitter fa-lg text-secondary"></i>
              <i className="fab fa-instagram fa-lg text-secondary"></i>
            </div>
          </div>
        </div>

        <hr className="border-secondary" />

        <div className="text-center pb-3">
          <p className="mb-0 small text-secondary">
            &copy; 2026 My E-commerce Site. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;