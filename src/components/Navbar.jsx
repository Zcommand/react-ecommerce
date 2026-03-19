// src/components/Navbar.jsx
import { useState, useContext, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../assets/images/LOGO.svg";
import { CartContext } from "../context/CartContext.jsx";

const Navbar = () => {
  const { cart = [], wishlist = [], compareList = [] } = useContext(CartContext);
  const totalItems = cart.reduce((sum, item) => sum + (item.qty || 0), 0);
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);
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

  // Close desktop dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (desktopDropdownRef.current && !desktopDropdownRef.current.contains(event.target)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

              {/* Desktop More */}
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

              {/* Wishlist, Compare, Cart */}
              {[
                { to: "/wishlist", icon: "fa-heart", count: wishlist.length },
                { to: "/compare", icon: "fa-exchange-alt", count: compareList.length },
                { to: "/cart", icon: "fa-shopping-cart", count: totalItems },
              ].map(({ to, icon, count }) => (
                <li className="nav-item position-relative ms-3" key={to}>
                  <NavLink to={to} className="nav-link position-relative">
                    <i className={`fa ${icon}`}></i>
                    {count > 0 && (
                      <span
                        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                        style={{ fontSize: "0.7rem" }}
                      >
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

      {/* MOBILE */}
      <nav className="navbar fixed-bottom bg-light border-top shadow-lg d-lg-none">
        <div className="d-flex justify-content-around w-100 text-center">
          {[ 
            { to: "/", icon: "fa-home", label: "Home" },
            { to: "/products", icon: "fa-box", label: "Products" },
            { icon: "fa-ellipsis-h", label: "More", isMore: true },
            { to: "/cart", icon: "fa-shopping-cart", label: "Cart", count: totalItems },
          ].map(({ to, icon, label, count, isMore }) => (
            <div key={label} className="position-relative flex-fill">
              {isMore ? (
                <button
                  className="btn w-100 text-dark"
                  style={{ background: "none" }}
                  onClick={() => setMobileMoreOpen(true)}
                >
                  <i className={`fa ${icon} fs-5`}></i>
                  <div style={{ fontSize: "12px" }}>{label}</div>
                </button>
              ) : (
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `d-block text-center text-decoration-none ${isActive ? "text-primary" : "text-dark"}`
                  }
                >
                  <div className="position-relative d-inline-block">
                    <i className={`fa ${icon} fs-5`}></i>
                    {count > 0 && (
                      <span
                        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                        style={{ fontSize: "0.7rem" }}
                      >
                        {count}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: "12px" }}>{label}</div>
                </NavLink>
              )}
            </div>
          ))}
        </div>

        {/* Mobile More Drawer */}
        {mobileMoreOpen && (
          <div
            className="position-fixed bottom-0 start-0 w-100 h-75 bg-light shadow-lg"
            style={{ zIndex: 1050, overflowY: "auto", borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }}
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
                    `nav-link d-flex align-items-center justify-content-between py-2 ${isActive ? "text-primary fw-bold" : "text-dark"}`
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
    </>
  );
};

export default Navbar;