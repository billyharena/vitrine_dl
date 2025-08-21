import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer style={{ background: "rgb(0, 115, 104)" }}>
      <div className="container py-4 py-lg-5" style={{ position: "relative", fontFamily: "'IBM Plex Mono', monospace", background: "rgb(0, 115, 104)" }}>
        <div className="row justify-content-center">
          {/* Section Formations statique */}
          <div className="col-sm-4 col-md-3 text-center text-lg-start d-flex flex-column">
            <ul className="list-unstyled">
              <li>
                <Link
                  to="/services"
                  style={{ color: "rgba(177, 208, 229, 1)" }}
                >
                  Nos formations
                </Link>
              </li>
            </ul>
          </div>

          {/* Section Contact */}
          <div className="col-sm-4 col-md-3 text-center text-lg-start d-flex flex-column">
            <h3 className="fs-6 fw-bold" style={{ color: "rgba(177, 208, 229, 1)" }}>Contact</h3>
            <ul className="list-unstyled">
              <li><a href="tel:+261342218839" style={{ color: "rgba(177, 208, 229, 1)" }}>+261 38 06 963 92</a></li>
              <li><a href="mailto:contact@genese.expert" style={{ color: "rgba(177, 208, 229, 1)" }}>contact-data-light@gmail.com</a></li>
              <li><a href="https://maps.app.goo.gl/SWyUPAXUY4KzcXRd8" style={{ color: "rgba(177, 208, 229, 1)" }}>Data Light Madagascar</a></li>
            </ul>
          </div>
        </div>

        <hr />
        <div className="text-muted d-flex justify-content-between align-items-center pt-3">
          <p className="mb-0" style={{ color: "rgba(177, 208, 229, 1)" }}>Copyright © 2024 - Data Light</p>
          <p hidden>Billy Harena MARLEY</p>
          <ul className="list-inline mb-0">
            <li className="list-inline-item">
              <a
                href="https://m.facebook.com/p/Gen%C3%A8se-100082961541409/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "rgba(177, 208, 229, 1)", fontSize: "24px" }}
              >
                <i className="bi bi-facebook"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a
                href="https://mg.linkedin.com/company/gen%C3%A8sedata"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "rgba(177, 208, 229, 1)", fontSize: "24px" }}
              >
                <i className="bi bi-linkedin"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;