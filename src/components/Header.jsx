import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header-hero text-white position-relative overflow-hidden">
      <div className="container text-center py-5 position-relative">

        {/* Floating glow circles */}
        <div className="glow glow-1"></div>
        <div className="glow glow-2"></div>

        {/* Badge */}
        <span className="badge bg-warning text-dark mb-3 px-4 py-2 fs-6 shadow">
          🏮 Limited Time Offer
        </span>

        {/* Title */}
        <h1 className="fw-bold display-5 mt-2 mb-3 animate-title">
          🧧 Chinese New Year Sale 🧧
        </h1>

        {/* Subtitle */}
        <p className="lead mb-3">
          Enjoy up to{" "}
          <span className="fw-bold text-warning fs-4">25% OFF</span> on selected items
        </p>

        {/* CTA */}
        <div className="mt-3">
          <Link
            to="/products"
            className="btn btn-warning fw-bold px-4 py-2 shadow btn-hover"
          >
            Shop Now
          </Link>
        </div>

        {/* Footer */}
        <small className="d-block mt-3 opacity-75">
          Promo valid until <strong>January 20, 2027</strong>
        </small>

      </div>
    </header>
  );
};

export default Header;