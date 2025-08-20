import React from "react";
// import { Link } from 'react-router-dom';
import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <SectionWrapper>
      <SectionHeader
        title="À propos"
        text="Data Light se positionne en spécialiste de la convergence de la Data, offrant des formations uniques pour faire de la formation un atout stratégique et faciliter la transformation et l’innovation au sein de votre entreprise."
      />
      <CardGrid>
        <AnimatedCard
          imgSrc="assets/img/g7e77f725fbd1b2c24dffad5ec63a203829984c63f12db4380378370f50e310e85100d1600e1479f7957e4ab2f21f8253f168f0695966522246fff5cb5fbe3458_640-1.png"
          title="Test de niveau"
          text="Offre une évaluation rapide de vos compétences en formation à travers des testes, avec des résultats communiqué dans les 24h suivant leur réception."
        />
        <AnimatedCard
          imgSrc="assets/img/gc4b0f7450a8a4749d56f9960878d4cc6618a214dd8e2ff7c5ff36be23ec34b29ab3aa5094d015a91dd78025d658424905ae45d1a18b20479f40118cc09ec9e0a_640-1.png"
          title="Bonus"
          text="Bénéficiez d'une attestation de fin de formation, d'un accompagnement de 12 mois, d'un support de cours et de 52 exercices gratuits."
        />
        <AnimatedCard
          imgSrc="assets/img/methodologie.png"
          title="Note"
          text="Data Light propose des formations optimales avec une infrastructure complète, favorisant l'autonomie au travail grâce à des consultants experts reconnu pour leur transmission efficace de savoir-faire"
        />
      </CardGrid>
    </SectionWrapper>
  );
};

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

const App = () => {
  return (
    <div>
      <AboutSection />
      <PlusSection />
    </div>
  );
};

export default App;