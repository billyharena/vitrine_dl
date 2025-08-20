import React, { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import formationsData from "../data/formations.json"; // Assurez-vous que ce chemin est correct

// Composant pour la section "Plus"
const PlusSection = () => {
  return (
    <SectionWrapper>
      <SectionHeader
        title="Offrez-vous plus qu’une formation"
      />
      <CardGrid>
        <AnimatedCard
          imgSrc="assets/img/plus-support.png"
          title="Support de cours"
          text="Support de cours complet en PDF pour chaque module avec mises à jour régulières."
        />
        <AnimatedCard
          imgSrc="assets/img/plus-accompagnement.png"
          title="Accompagnement gratuit"
          text="12 mois d'accompagnement personnalisé pour une mise en pratique optimale."
        />
        <AnimatedCard
          imgSrc="assets/img/plus-exercices.jpg"
          title="Exercices de suivi"
          text="Exercices pratiques adaptés à chaque module pour renforcer vos compétences."
        />
      </CardGrid>
    </SectionWrapper>
  );
};

// Composants réutilisables
const SectionWrapper = ({ children }) => (
  <motion.section
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, margin: "-100px" }}
    style={{ background: "#fffbf5" }}
  >
    <div className="container py-5 py-xl-6">
      {children}
    </div>
  </motion.section>
);

const SectionHeader = ({ title, text }) => {
  const variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      className="row mb-5"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ staggerChildren: 0.2 }}
    >
      <div className="col-md-8 col-xl-6 text-center mx-auto">
        <motion.h2
          className="display-5 fw-bold mb-4 gradient-text"
          variants={variants}
        >
          {title}
        </motion.h2>
        {text && (
          <motion.p
            className="lead text-muted mb-0"
            variants={variants}
          >
            {text}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

const CardGrid = ({ children }) => (
  <motion.div
    className="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    transition={{ staggerChildren: 0.1 }}
  >
    {children}
  </motion.div>
);

const AnimatedCard = ({ imgSrc, title, text }) => {
  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 300 }
    }
  };

  return (
    <motion.div
      className="col"
      variants={cardVariants}
      whileHover={{ scale: 1.05 }}
    >
      <div className="card h-100 overflow-hidden border-0 shadow-lg hover-shadow">
        <div className="position-relative overflow-hidden">
          <img
            className="card-img-top w-100 d-block"
            alt={title}
            style={{
              height: "240px",
              objectFit: "cover",
              objectPosition: "center",
              transition: "transform 0.3s ease"
            }}
            src={imgSrc}
          />
          <div className="position-absolute bottom-0 start-0 end-0 p-3 gradient-overlay" />
        </div>
        <div className="card-body p-4">
          <h4 className="card-title fw-bold mb-3 text-primary">{title}</h4>
          <p className="card-text text-secondary mb-0">{text}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Services = () => {
  const [formations, setFormations] = useState([]);

  useEffect(() => {
    setFormations(formationsData);
  }, []);

  return (
    <section className="py-5 d-flex align-items-center justify-content-center" style={{
      fontFamily: "'IBM Plex Mono', monospace",
      background: "#fffbf5",
      minHeight: "80vh"
    }}>
      <div className="container">
        <div className="row mb-3 text-center">
          <SectionHeader
            title="Nos formations :"
          />
        </div>

        <div className="row justify-content-center">
          {formations.map((formation) => (
            <div className="col-md-4 d-flex justify-content-center" key={formation.id}>
              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front d-flex flex-column align-items-center">
                    <h3>{formation.formation}</h3>
                    <img
                      src={formation.img}
                      alt={formation.formation}
                      className="img-fluid"
                      style={{ maxWidth: "200px", height: "200px" }}
                    />
                  </div>
                  <div className="flip-card-back d-flex align-items-center justify-content-center">
                    <div className="text-light px-3 text-center" style={{ fontSize: "1rem", fontWeight: "normal" }}
                      dangerouslySetInnerHTML={{ __html: formation.descriptions }} />
                  </div>
                </div>
                <a
                  className="btn btn-warning mt-3 px-4 py-2 fw-bold shadow-sm"
                  href={`/formations/${formation.id}`}
                  style={{ borderRadius: "8px", width: "100%", fontSize: "1.1rem" }}
                >
                  VOIR LES MODULES
                </a>
              </div>
            </div>
          ))}
        </div>
        <br></br>
        <br></br>
        <PlusSection />
      </div>

      <style jsx>{`
        .flip-card {
          background-color: transparent;
          width: 350px;
          height: 350px;
          perspective: 1000px;
          text-align: center;
        }

        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }

        .flip-card:hover .flip-card-inner {
          transform: rotateY(180deg);
        }

        .flip-card-front, .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 10px;
        }

        .flip-card-front {
          background: white;
        }

        .flip-card-back {
          background: rgba(0, 115, 104, 0.9);
          color: rgba(251, 201, 102, 1);
          transform: rotateY(180deg);
          padding: 20px;
        }
      `}</style>
    </section>
  );
};

export default Services;