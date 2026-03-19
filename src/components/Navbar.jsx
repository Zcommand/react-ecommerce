import { useState, useContext, useEffect, useRef } from "react";
import { NavLink, useLocation, Link } from "react-router-dom";
import logo from "../assets/images/LOGO.svg";
import { CartContext } from "../context/CartContext.jsx";

const Navbar = () => {
  const { cart = [], wishlist = [], compareList = [] } = useContext(CartContext);
  const totalItems = cart.reduce((sum, item) => sum + (item.qty || 0), 0);
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);

  // ✅ Compare modal state
  const [showCompareModal, setShowCompareModal] = useState(false);

  const desktopDropdownRef = useRef(null);

  const mainLinks = [
    { to: "/", label: "Home", icon: "fa-home", end: true },
    { to: "/products", label: "Products", icon: "fa-box" },
  ];

  const secondaryLinks = [
    { to: "/about", label: "About", icon: "fa-info-circle" },
    { to: "/contact", label: "Contact", icon: "fa-envelope" },
    { to: "/policies", label: "Policies", icon: "fa-file-alt" },
    { to: "/blog", label: "Blog", icon: "fa-blog" },
    { to: "/wishlist", label: "Wishlist", icon: "fa-heart", count: wishlist.length },
    { to: "/compare", label: "Compare", icon: "fa-exchange-alt", count: compareList.length },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        desktopDropdownRef.current &&
        !desktopDropdownRef.current.contains(event.target)
      ) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Show modal when 2 or more compare items
  useEffect(() => {
    if (compareList.length >= 2) {
      setShowCompareModal(true);
    }
  }, [compareList]);

  // ✅ NEW: Close modal automatically when route changes
  useEffect(() => {
    setShowCompareModal(false);
  }, [location.pathname]);

  return (
    <>
      {/* DESKTOP */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-lg d-none d-lg-block">
        <div className="container">
          <NavLink className="navbar-brand d-flex align-items-center" to="/">
            <img src={logo} alt="Logo" width="180" height="40" className="me-2" />
          </NavLink>

          <div className="collapse navbar-collapse show">
            <ul className="navbar-nav ms-auto align-items-center">
              {mainLinks.map(({ to, label, icon, end }) => (
                <li className="nav-item mx-1" key={to}>
                  <NavLink
                    to={to}
                    end={end}
                    className={({ isActive }) =>
                      `nav-link d-flex align-items-center ${isActive ? "text-danger fw-bold" : ""}`
                    }
                  >
                    <i className={`fa ${icon} me-1`}></i>
                    {label}
                  </NavLink>
                </li>
              ))}

              <li className="nav-item dropdown mx-1" ref={desktopDropdownRef}>
                <span
                  className="nav-link dropdown-toggle"
                  style={{ cursor: "pointer" }}
                  onClick={() => setMoreOpen(!moreOpen)}
                >
                  More
                </span>
                <ul className={`dropdown-menu ${moreOpen ? "show" : ""}`}>
                  {secondaryLinks.map(({ to, label, icon }) => (
                    <li key={to}>
                      <NavLink
                        to={to}
                        className="dropdown-item d-flex align-items-center"
                        onClick={() => setMoreOpen(false)}
                      >
                        <i className={`fa ${icon} me-2`}></i>
                        {label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>

              {[
                { to: "/wishlist", icon: "fa-heart", count: wishlist.length },
                { to: "/compare", icon: "fa-exchange-alt", count: compareList.length },
                { to: "/cart", icon: "fa-shopping-cart", count: totalItems },
              ].map(({ to, icon, count }) => (
                <li className="nav-item position-relative ms-3" key={to}>
                  <NavLink to={to} className="nav-link position-relative">
                    <i className={`fa ${icon}`}></i>
                    {count > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                        style={{ fontSize: "0.7rem" }}>
                        {count}
                      </span>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* MOBILE (unchanged UI parts omitted for brevity) */}
      <nav className="navbar fixed-bottom bg-light border-top shadow-lg d-lg-none">
        <div className="d-flex justify-content-around align-items-center w-100 text-center">

          <NavLink to="/" className={({ isActive }) =>
            `flex-fill text-decoration-none ${isActive ? "text-primary" : "text-dark"}`
          }>
            <div className="d-flex flex-column align-items-center py-1">
              <i className="fa fa-home fs-5"></i>
              <small>Home</small>
            </div>
          </NavLink>

          <NavLink to="/products" className={({ isActive }) =>
            `flex-fill text-decoration-none ${isActive ? "text-primary" : "text-dark"}`
          }>
            <div className="d-flex flex-column align-items-center py-1">
              <i className="fa fa-box fs-5"></i>
              <small>Products</small>
            </div>
          </NavLink>

          <button
            className="flex-fill btn text-dark p-0"
            style={{ background: "none", border: "none" }}
            onClick={() => setMobileMoreOpen(true)}
          >
            <div className="d-flex flex-column align-items-center py-1">
              <i className="fa fa-ellipsis-h fs-5"></i>
              <small>More</small>
            </div>
          </button>

          <NavLink to="/cart" className={({ isActive }) =>
            `flex-fill text-decoration-none ${isActive ? "text-primary" : "text-dark"}`
          }>
            <div className="d-flex flex-column align-items-center py-1 position-relative">
              <i className="fa fa-shopping-cart fs-5"></i>

              {totalItems > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: "0.65rem" }}>
                  {totalItems}
                </span>
              )}

              <small>Cart</small>
            </div>
          </NavLink>

        </div>

        {/* Mobile More Drawer stays same */}
        {mobileMoreOpen && (
          <div className="position-fixed bottom-0 start-0 w-100 h-75 bg-light shadow-lg"
            style={{ zIndex: 1050, overflowY: "auto", borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }}>

            <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
              <h5 className="mb-0">More</h5>
              <button className="btn btn-sm btn-outline-secondary"
                onClick={() => setMobileMoreOpen(false)}>
                Close
              </button>
            </div>

            <div className="d-flex flex-column p-2">
              {secondaryLinks.map(({ to, label, icon, count }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `nav-link d-flex align-items-center justify-content-between py-2 ${
                      isActive ? "text-primary fw-bold" : "text-dark"
                    }`
                  }
                  onClick={() => setMobileMoreOpen(false)}
                >
                  <span className="d-flex align-items-center">
                    <i className={`fa ${icon} me-2`}></i>
                    {label}
                  </span>
                  {count > 0 && (
                    <span className="badge rounded-pill bg-danger" style={{ fontSize: "0.7rem" }}>
                      {count}
                    </span>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* ✅ COMPARE MODAL */}
      {showCompareModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center"
          style={{ zIndex: 2000 }}
        >
          <div className="bg-white p-4 rounded shadow" style={{ width: "90%", maxWidth: "500px" }}>
            <h5 className="text-danger mb-3">Compare Products</h5>

            <p>You have selected {compareList.length} products.</p>

            <div className="d-flex justify-content-end gap-2">
              <button
                className="btn btn-outline-secondary"
                onClick={() => setShowCompareModal(false)}
              >
                Close
              </button>

              {/* ✅ FIX: close modal on click */}
              <Link
                to="/compare"
                className="btn btn-danger"
                onClick={() => setShowCompareModal(false)}
              >
                Go to Compare
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;