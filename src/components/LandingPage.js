import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import FlipCard from "./FlipCard";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import landingPageData from "../data/landingPageData.json"; // Importez les données depuis le fichier JSON

// Fonction pour mélanger un tableau (algorithme de Fisher-Yates)
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const LandingPage = () => {
  const [activeSection, setActiveSection] = useState(0);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const inView1 = useInView(ref1, { margin: "-30% 0px 0px 0px" });
  const inView2 = useInView(ref2, { margin: "-30% 0px 0px 0px" });
  const inView3 = useInView(ref3, { margin: "-30% 0px 0px 0px" });
  const [bgOpacity, setBgOpacity] = useState(1);
  const [shuffledLogoImages, setShuffledLogoImages] = useState([]);
  const [avisClients, setAvisClients] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const fadeStart = 100;
      const fadeEnd = 500;
      let newOpacity = 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart);
      newOpacity = Math.max(0, Math.min(1, newOpacity));
      setBgOpacity(newOpacity);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (inView1) setActiveSection(0);
    if (inView2) setActiveSection(1);
    if (inView3) setActiveSection(2);
  }, [inView1, inView2, inView3]);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.1, ease: "easeOut" } }
  };

  useEffect(() => {
    // Remplacer l'appel API par les données JSON
    setAvisClients(landingPageData.testimonials);
    setShuffledLogoImages(shuffleArray(landingPageData.logos));

    // Initialisation du carrousel
    const carouselElement = document.getElementById('logoCarousel');
    if (carouselElement) {
      if (window.bootstrap && window.bootstrap.Carousel) {
        new window.bootstrap.Carousel(carouselElement, {
          interval: 2000,
          ride: 'carousel'
        });
      }
    }
  }, []);

  return (
    <div className="container-fluid p-0" style={{ scrollBehavior: "smooth" }}>
      {/* Navigation Dots */}
      <div className="fixed-top mt-4 d-flex justify-content-center w-100" style={{ zIndex: 1000 }}>
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className="mx-2 rounded-circle cursor-pointer"
            style={{
              width: activeSection === index ? "14px" : "10px",
              height: activeSection === index ? "14px" : "10px",
              backgroundColor: activeSection === index ? "#ffffff" : "rgba(255,255,255,0.3)",
              transition: "all 0.3s ease"
            }}
            onClick={() => {
              document.getElementById(`section-${index}`)?.scrollIntoView({ behavior: "smooth" });
            }}
          />
        ))}
      </div>

      {/* Section 1 */}
      <motion.section
        className="min-vh-100 d-flex justify-content-center align-items-center position-relative"
        style={{
          position: "relative",
          overflow: "hidden"
        }}
      >
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundImage: "url(/assets/img/BG.jpeg.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: bgOpacity,
            transition: "opacity 0.2s ease-out",
          }}
        ></div>

        <div className="container position-relative" style={{ zIndex: 1, marginTop: "-125px" }}>
          <div className="row align-items-center justify-content-between">
            <FlipCard />
            <div className="col-lg-6 d-flex flex-column align-items-center gap-4" style={{ color: "rgba(255, 253, 253, 1)" }}>
              <h2 className="fw-bold text-uppercase text-center">ILS NOUS FONT CONFIANCE</h2>
              <motion.div
                className="p-4 rounded-4 shadow-lg w-100 text-center"
                style={{
                  backgroundColor: "rgba(0, 115, 104, 0.9)",
                  minWidth: "380px",
                  height: "110px",
                  color: "rgba(255, 253, 253, 1)",
                }}
                whileHover={{ scale: 1.15 }}
              >
                <p className="fw-bold fs-3 text-center"><i className="bi bi-building" style={{ color: "rgba(252, 201, 102, 1)", }}></i> +10 entreprises</p>
              </motion.div>
              <motion.div
                className="p-4 rounded-4 shadow-lg w-100 text-center"
                style={{
                  backgroundColor: "rgba(0, 115, 104, 0.9)",
                  minWidth: "380px",
                  height: "110px",
                  color: "rgba(255, 253, 253, 1)",
                }}
                whileHover={{ scale: 1.15 }}
              >
                <p className="fw-bold fs-3 text-center"><i className="bi bi-people-fill" style={{ color: "rgba(252, 201, 102, 1)", }}></i> +200 apprenants</p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Section 2 */}
      <motion.section
        ref={ref2}
        id="section-1"
        className="d-flex align-items-center bg-light"
        style={{ minHeight: "80vh", marginTop: "-100px" }}
        initial="hidden"
        animate={inView2 ? "visible" : "hidden"}
        variants={sectionVariants}
      >
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-md-6 order-md-2">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="overflow-hidden rounded-4 shadow-lg"
              >
                <img
                  src="/assets/img/formateur_img01.jpg"
                  alt="Analyse de données"
                  className="img-fluid"
                  style={{ minHeight: "280px", objectFit: "cover" }}
                />
              </motion.div>
            </div>
            <div className="col-md-6 order-md-1">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="display-6 fw-bold text-success mb-4">Ce que nous faisons</h2>
                <p className="lead text-muted mb-4 fs-5">
                  Data Light est un spécialiste de la convergence de la Data et du Cloud.<br />
                  Nous accompagnons les entreprises dans leur transition numérique<br />
                  avec des solutions adaptées.
                </p>
                <Link
                  to="/services"
                  className="btn btn-warning btn-lg fw-bold px-5 py-3 rounded-pill shadow"
                  style={{ transition: "all 0.3s ease" }}
                  onMouseEnter={(e) => e.target.style.transform = "translateY(-3px)"}
                  onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}
                >
                  Voir nos formations →
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Section 3 */}
      <motion.section
        ref={ref3}
        id="section-2"
        className="vh-100 d-flex flex-column justify-content-center align-items-center"
        initial="hidden"
        animate={inView3 ? "visible" : "hidden"}
        variants={sectionVariants}
      >
        <div className="container">
          {/* Carousel des Logos avec défilement automatique et ordre aléatoire */}
          <div id="logoCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="2000">
            <div className="carousel-inner">
              {shuffledLogoImages.length > 0 && Array.from({ length: Math.ceil(shuffledLogoImages.length / 3) }).map((_, itemIndex) => (
                <div key={itemIndex} className={`carousel-item ${itemIndex === 0 ? 'active' : ''}`}>
                  <div className="d-flex justify-content-around">
                    {shuffledLogoImages.slice(itemIndex * 3, itemIndex * 3 + 3).map((logoSrc, logoIndex) => (
                      <img
                        key={logoIndex}
                        src={logoSrc}
                        alt={`Logo ${itemIndex * 3 + logoIndex + 1}`}
                        className="d-block w-auto"
                        style={{ maxHeight: "50px" }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#logoCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#logoCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
          {/* Titre Section */}
          <motion.h2
            className="display-6 fw-bold text-success text-center mb-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Ce qu’ils disent de nous
          </motion.h2>
          {/* Témoignages */}
          <div className="row g-4 justify-content-center">
            {avisClients && avisClients.slice(0, 3).map(avis => (
              <div className="col-md-4" key={avis.id}>
                {/* <Link to="/liste-avis-clients" style={{ textDecoration: 'none', color: 'inherit' }}> */}
                <motion.div
                  className="p-4 bg-light rounded-4 text-center shadow-lg h-100"
                  whileHover={{ scale: 1.05 }}
                >
                  <p className="text-dark fw-bold m-0">
                    {avis.avis}
                  </p>
                  <p className="text-muted m-0">
                    {avis.nom} {avis.prenom}
                  </p>
                </motion.div>
                {/* </Link> */}
              </div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default LandingPage;