import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../assets/logocars.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCarSide,
  faHouse,
  faPhone,
  faUser,
  faCircleUser,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("souss_token"))
  );

  const [menuOpen, setMenuOpen] = useState(false);

  const role = localStorage.getItem("souss_role");

  useEffect(() => {
    setIsLoggedIn(Boolean(localStorage.getItem("souss_token")));
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className="navbar">

      <Link to="/" className="logo">
        <img src={logo} alt="SOUSS CARS" />
        <span>SOUSS</span> CARS
      </Link>

      {/* Menu Desktop */}
      <div className={`nav-links ${menuOpen ? "active" : ""}`}>

        <NavLink to="/" end>
          <FontAwesomeIcon icon={faHouse} />
          Accueil
        </NavLink>

        <NavLink to="/cars">
          <FontAwesomeIcon icon={faCarSide} />
          Nos voitures
        </NavLink>

        <NavLink to="/about">
          À propos
        </NavLink>

        <NavLink to="/contact">
          <FontAwesomeIcon icon={faPhone} />
          Contact
        </NavLink>

        {isLoggedIn && role === "client" && (
          <NavLink to="/client/dashboard">
            <FontAwesomeIcon icon={faCircleUser} />
            Mon espace
          </NavLink>
        )}

        {isLoggedIn && role === "admin" && (
          <NavLink to="/admin/dashboard">
            <FontAwesomeIcon icon={faCircleUser} />
            Administration
          </NavLink>
        )}

        {(!isLoggedIn || location.pathname === "/") && (
          <Link
            to="/login"
            className="mobile-login"
            onClick={() => setMenuOpen(false)}
          >
            <FontAwesomeIcon icon={faUser} />
            Connexion
          </Link>
        )}

      </div>

      {/* Bouton Connexion Desktop */}
      {(!isLoggedIn || location.pathname === "/") && (
        <Link to="/login" className="login-btn">
          <FontAwesomeIcon icon={faUser} />
          Connexion
        </Link>
      )}

      {/* Bouton Menu Mobile */}
      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Ouvrir le menu"
      >
        <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} />
      </button>

    </nav>
  );
}

export default Navbar;