import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import Toggletheme from "../Toggeltheme/Themetoggle";

import { HashLink } from "react-router-hash-link";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

export default function Navbar() {
  const location = useLocation(); // current page ka path

  // Active link highlight karne ke liye
  const isActive = (path) => location.pathname === path;
  const [menuOpen, setMenuOpen] = useState(false);
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;
  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        Eco<span>Aware</span>
      </Link>

      <ul className={menuOpen ? "nav-links active" : "nav-links"}>
        <li>
          <Link to="/" className={isActive("/") ? "active" : ""}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/quiz" className={isActive("/quiz") ? "active" : ""}>
            Quiz
          </Link>
        </li>
        <li>
          <Link to="/chatbot" className={isActive("/chatbot") ? "active" : ""}>
            EcoBot
          </Link>
        </li>
        <li>
          <HashLink smooth to="/#pledge">
            Pledge
          </HashLink>
        </li>
        <li className="mobile-theme">
          <Toggletheme mobile />
        </li>
      </ul>

      <div className="nav-right">
        <div className="desktop-theme">
          <Toggletheme />
        </div>

        <div className="auth-links">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="login-btn">
                Login
              </Link>

              <Link to="/register" className="register-btn">
                Register
              </Link>
            </>
          ) : (
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          )}
        </div>

        <HashLink smooth to="/#pledge" className="nav-cta">
          Make a Pledge
        </HashLink>

        <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
}
