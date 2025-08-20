import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContactUs = () => {
    const [result, setResult] = useState("");
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const onSubmit = async (event) => {
        event.preventDefault();
        setResult("Envoi en cours...");
        const data = new FormData(event.target);

        data.append("access_key", "00dc37a8-16f3-4bd8-8bcc-7222d83eca8a");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: data
            });

            const resData = await response.json();

            if (resData.success) {
                setResult("Message envoyé avec succès !");
                event.target.reset();
                setFormData({ name: '', email: '', message: '' }); // Réinitialise l'état
            } else {
                console.error("Erreur lors de l'envoi :", resData);
                setResult(`Erreur : ${resData.message}`);
            }
        } catch (error) {
            console.error("Erreur de connexion :", error);
            setResult("Une erreur de connexion est survenue.");
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <motion.section
            id="contact"
            className="py-5"
            style={{ background: "#fffbf5", fontFamily: "'IBM Plex Mono', monospace" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-lg-8 text-center">
                        <motion.h2
                            className="display-4 fw-bold mb-4"
                            initial={{ y: -50 }}
                            animate={{ y: 0 }}
                            transition={{ type: "spring", stiffness: 100 }}
                        >
                            Contactez-nous
                        </motion.h2>
                        <p className="lead text-muted mb-5">
                            Envoyez-nous un message et nous vous répondrons dans les plus brefs délais !
                        </p>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <form onSubmit={onSubmit} className="p-4 rounded-4 shadow-lg" style={{ background: "white" }}>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="name" style={{ fontWeight: 'bold' }}>Nom et prénom</label>
                                <motion.input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    style={{ borderColor: "rgba(0, 115, 104, 0.5)", fontFamily: "'IBM Plex Mono', monospace" }}
                                    whileFocus={{ scale: 1.02, borderColor: "rgb(0, 115, 104)", boxShadow: "0 0 0 .25rem rgba(0, 115, 104, 0.25)" }}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="email" style={{ fontWeight: 'bold' }}>Adresse e-mail</label>
                                <motion.input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    style={{ borderColor: "rgba(0, 115, 104, 0.5)", fontFamily: "'IBM Plex Mono', monospace" }}
                                    whileFocus={{ scale: 1.02, borderColor: "rgb(0, 115, 104)", boxShadow: "0 0 0 .25rem rgba(0, 115, 104, 0.25)" }}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="message" style={{ fontWeight: 'bold' }}>Message</label>
                                <motion.textarea
                                    className="form-control"
                                    id="message"
                                    name="message"
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    style={{ borderColor: "rgba(0, 115, 104, 0.5)", fontFamily: "'IBM Plex Mono', monospace" }}
                                    whileFocus={{ scale: 1.02, borderColor: "rgb(0, 115, 104)", boxShadow: "0 0 0 .25rem rgba(0, 115, 104, 0.25)" }}
                                ></motion.textarea>
                            </div>
                            <div className="d-grid gap-2">
                                <motion.button
                                    type="submit"
                                    className="btn btn-warning btn-lg fw-bold"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{ backgroundColor: "rgba(252, 201, 102, 1)", borderColor: "rgba(252, 201, 102, 1)", color: "rgb(0, 115, 104)" }}
                                >
                                    Envoyer
                                </motion.button>
                            </div>
                        </form>
                        {result && (
                            <motion.span
                                className="mt-3 d-block"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                style={{ color: result.includes('succès') ? 'green' : 'red' }}
                            >
                                {result}
                            </motion.span>
                        )}
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default ContactUs;