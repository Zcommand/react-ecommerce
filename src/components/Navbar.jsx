import { useState, useContext, useEffect, useRef } from "react";
import { NavLink, useLocation, Link } from "react-router-dom";
import logo from "../assets/images/LOGO.svg";
import { CartContext } from "../context/CartContext.jsx";

const Navbar = () => {
  const { cart = [], wishlist = [], compareList = [] } = useContext(CartContext);
  const totalItems = cart.reduce((sum, item) => sum + (item.qty || 0), 0);
  const location = useLocation();

  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);
  const [showCompareModal, setShowCompareModal] = useState(false);

  const [darkMode, setDarkMode] = useState(false);

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

  // Apply dark mode
  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (desktopDropdownRef.current && !desktopDropdownRef.current.contains(event.target)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Compare modal trigger
  useEffect(() => {
    if (compareList.length >= 2) setShowCompareModal(true);
  }, [compareList]);

  useEffect(() => {
    setShowCompareModal(false);
  }, [location.pathname]);

  return (
    <>
      {/* DESKTOP NAVBAR */}
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

              {/* MORE */}
              <li className="nav-item dropdown mx-1" ref={desktopDropdownRef}>
                <span className="nav-link dropdown-toggle" onClick={() => setMoreOpen(!moreOpen)}>
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

              {/* DARK MODE TOGGLE */}
              <li className="nav-item ms-3">
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => setDarkMode(!darkMode)}
                >
                  <i className={`fa ${darkMode ? "fa-sun" : "fa-moon"}`}></i>
                </button>
              </li>

              {/* ICONS */}
              {[
                { to: "/wishlist", icon: "fa-heart", count: wishlist.length },
                { to: "/compare", icon: "fa-exchange-alt", count: compareList.length },
                { to: "/cart", icon: "fa-shopping-cart", count: totalItems },
              ].map(({ to, icon, count }) => (
                <li className="nav-item position-relative ms-3" key={to}>
                  <NavLink to={to} className="nav-link position-relative">
                    <i className={`fa ${icon}`}></i>
                    {count > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
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

      {/* MOBILE NAVBAR */}
      <nav className="navbar fixed-bottom bg-light border-top shadow-lg d-lg-none" style={{ zIndex: 1030 }}>
        <div className="d-flex justify-content-around align-items-center w-100 text-center">

          <NavLink to="/" className={({ isActive }) => `flex-fill text-decoration-none ${isActive ? "text-primary" : "text-body"}`}>
            <div className="d-flex flex-column align-items-center py-1">
              <i className="fa fa-home fs-5"></i>
              <small>Home</small>
            </div>
          </NavLink>

          <NavLink to="/products" className={({ isActive }) => `flex-fill text-decoration-none ${isActive ? "text-primary" : "text-body"}`}>
            <div className="d-flex flex-column align-items-center py-1">
              <i className="fa fa-box fs-5"></i>
              <small>Products</small>
            </div>
          </NavLink>

          <button
            className="flex-fill btn p-0 border-0 bg-transparent text-body"
            onClick={() => setMobileMoreOpen(true)}
          >
            <div className="d-flex flex-column align-items-center py-1">
              <i className="fa fa-ellipsis-h fs-5"></i>
              <small>More</small>
            </div>
          </button>

          <button
            className="flex-fill btn p-0 border-0 bg-transparent text-body"
            onClick={() => setDarkMode(!darkMode)}
          >
            <div className="d-flex flex-column align-items-center py-1">
              <i className={`fa ${darkMode ? "fa-sun" : "fa-moon"} fs-5`}></i>
              <small>Theme</small>
            </div>
          </button>

          <NavLink to="/cart" className={({ isActive }) => `flex-fill text-decoration-none ${isActive ? "text-primary" : "text-body"}`}>
            <div className="d-flex flex-column align-items-center py-1 position-relative">
              <i className="fa fa-shopping-cart fs-5"></i>
              {totalItems > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {totalItems}
                </span>
              )}
              <small>Cart</small>
            </div>
          </NavLink>

        </div>

        {/* MOBILE DRAWER */}
        {mobileMoreOpen && (
          <div
            className="position-fixed bottom-0 start-0 w-100 h-75 bg-light shadow-lg"
            style={{ zIndex: 2000, overflowY: "auto", borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }}
          >
            <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
              <h5 className="mb-0">More</h5>
              <button className="btn btn-sm btn-outline-secondary" onClick={() => setMobileMoreOpen(false)}>
                Close
              </button>
            </div>

            <div className="d-flex flex-column p-2">
              {secondaryLinks.map(({ to, label, icon, count }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `nav-link d-flex justify-content-between py-2 ${isActive ? "text-primary fw-bold" : "text-body"}`
                  }
                  onClick={() => setMobileMoreOpen(false)}
                >
                  <span>
                    <i className={`fa ${icon} me-2`}></i>
                    {label}
                  </span>
                  {count > 0 && <span className="badge rounded-pill bg-danger">{count}</span>}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* COMPARE MODAL (FIXED DARK MODE) */}
      {showCompareModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{
            zIndex: 2000,
            backgroundColor: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(4px)"
          }}
        >
          <div
            className={`p-4 rounded shadow-lg ${
              darkMode ? "bg-dark text-white" : "bg-white text-dark"
            }`}
            style={{ width: "90%", maxWidth: "500px" }}
          >
            <h5 className="text-danger mb-3">Compare Products</h5>

            <p>
              You have selected <strong>{compareList.length}</strong> products.
            </p>

            <div className="d-flex justify-content-end gap-2 mt-3">
              <button
                className={`btn ${darkMode ? "btn-outline-light" : "btn-outline-secondary"}`}
                onClick={() => setShowCompareModal(false)}
              >
                Close
              </button>

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