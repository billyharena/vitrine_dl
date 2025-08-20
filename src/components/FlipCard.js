import { useState } from "react";
import { motion } from "framer-motion";

const FlipCard = () => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="col-lg-4 d-flex justify-content-center">
      <div
        className="flip-card"
        onClick={() => setFlipped(!flipped)}
        onMouseEnter={() => setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
        style={{ width: "550px", height: "400px", perspective: "1000px" }}
      >
        <motion.div
          className="flip-card-inner"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          style={{
            width: "100%",
            height: "100%",
            transformStyle: "preserve-3d",
            position: "relative",
          }}
        >
          {/* Face Avant */}
          <div
            className="flip-card-front p-5 rounded-4 shadow-lg text-center"
            style={{
              backgroundColor: "rgba(0, 115, 104, 0.9)",
              color: "rgba(255, 253, 253, 1)",
              position: "absolute",
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              // fontFamily: "'Dancing Script', cursive",
            }}
          >
            <h2 className="fw-bold mb-2">AVEC</h2>
            <div className="mb-3">
              <img
                src="/assets/img/Copyr.png"
                alt="Logo de l'entreprise Data Light"
                style={{ height: "90px", objectFit: "cover" }}
              />
            </div>
            <h2 className="fw-bold text-uppercase fs-5">
              OPTIMISEZ VOS DONNÉES, <br /> ÉCLAIREZ VOS IDÉES !
            </h2>
          </div>

          {/* Face Arrière */}
          <div
            className="flip-card-back p-5 rounded-4 shadow-lg text-center"
            style={{
              backgroundColor: "rgba(0, 115, 104, 0.9)",
              color: "rgba(255, 253, 253, 1)",
              position: "absolute",
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              transform: "rotateY(180deg)",
              fontFamily: 'IBM Plex Mono'
            }}
          >
            <h4 className="fw-bold">Nos valeurs :</h4>
            <ul>
              <li>Ambition</li>
              <li>Innovation</li>
              <li>Implication</li>
              <li>Agréabilité</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FlipCard;
