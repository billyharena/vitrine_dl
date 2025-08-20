import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import Services from "./components/Services";
import Apropos from "./components/Apropos";
// import FormationDetails from "./components/FormationDetails";
// import CartPage from "./components/CartPage";
import ScrollToTop from "./ScrollToTop";
// import { CartProvider } from "./context/CartContext";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import ListeProforma from "./components/ListeProforma";
// import ListeFacture from "./components/ListeFacture";
// import FactureDetails from "./components/FactureDetails";
// import Profile from "./components/Profile";
import Footer from "./components/Footer";
import ContactUs from "./components/ContactUs"; // 1. Importez le composant ContactUs

// import SuggestionsCalendar from "./components/SuggestionsCalendar";
// import ListeAvisClients from "./components/ListeAvisClients";
// import QuizzPage from "./components/QuizzPage";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  // useEffect(() => {
  //   setToken(localStorage.getItem("token"));
  // }, []);

  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/apropos" element={<Apropos />} />
        {/* <Route path="/formations/:formationId" element={<FormationDetails />} /> */}
        <Route path="/contact" element={<ContactUs />} /> {/* 2. Ajoutez une nouvelle route */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;