import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ }) => {
  const location = useLocation();
  const navbarCollapseRef = useRef(null);
  const navbarTogglerRef = useRef(null);

  const getLinkStyle = (path) => ({
    color: location.pathname === path ? "rgba(252, 201, 102, 1)" : "rgba(255, 255, 255, 1)",
    fontWeight: location.pathname === path ? "bold" : "normal",
  });

  const closeNavbar = () => {
    const navbarCollapse = navbarCollapseRef.current;
    const navbarToggler = navbarTogglerRef.current;
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      navbarToggler?.classList.add('collapsed');
      navbarCollapse.classList.remove('show');
      navbarCollapse.style.height = '0px'; // Réinitialiser la hauteur pour l'animation
    }
  };

  const handleNavbarTogglerClick = () => {
    const navbarCollapse = navbarCollapseRef.current;
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      closeNavbar();
    } else {
      // Le comportement d'ouverture est géré par Bootstrap lui-même
    }
  };

  // Se replier lors du changement de route
  useEffect(() => {
    closeNavbar();
  }, [location]);

  // Se replier lors d'un clic en dehors de la navbar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarCollapseRef.current && !navbarCollapseRef.current.contains(event.target) &&
        navbarTogglerRef.current && !navbarTogglerRef.current.contains(event.target) &&
        navbarCollapseRef.current.classList.contains('show')) {
        closeNavbar();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside); // Pour les écrans tactiles

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-md sticky-top navbar-shrink py-4 navbar-light" id="mainNav"
      style={{ fontFamily: "'IBM Plex Mono', monospace", backgroundColor: "rgb(0, 115, 104)" }}>
      <div className="container">

        {/* Logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/" onClick={closeNavbar}>
          <span className="bs-icon-sm bs-icon-circle bs-icon shadow d-flex justify-content-center align-items-center me-2 bs-icon">
            <img
              src="/assets/img/Logo.png"
              alt="Logo"
              style={{ width: "300%", height: "300%" }}
            />
          </span>
        </Link>

        {/* Bouton toggle pour mobile */}
        <button ref={navbarTogglerRef} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navcol-1"
          aria-controls="navcol-1" aria-expanded="false" aria-label="Toggle navigation"
          onClick={handleNavbarTogglerClick} // Ajouter notre gestionnaire de clic
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div ref={navbarCollapseRef} className="collapse navbar-collapse" id="navcol-1" style={{ color: "rgb(0, 115, 104)" }}>
          <ul className="navbar-nav mx-auto">
            <li className="nav-item me-md-4">
              <Link className="nav-link" to="/services" style={getLinkStyle("/services")} onClick={closeNavbar}>Services</Link>
            </li>
            <li className="nav-item me-md-4">
              <Link className="nav-link" to="/Apropos" style={getLinkStyle("/Apropos")} onClick={closeNavbar}>À propos</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;