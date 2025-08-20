import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import DOMPurify from 'dompurify';
import ModuleDetails from './ModuleDetails';
import { Button, Alert } from 'react-bootstrap';

const FormationDetails = () => {
  const { formationId } = useParams();
  const [modules, setModules] = useState([]);
  const [formation, setFormation] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quizzLink, setQuizzLink] = useState(null);
  const [quizzDisponible, setQuizzDisponible] = useState(false);
  const [downloadMessage, setDownloadMessage] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [formationResponse, modulesResponse] = await Promise.all([
          axios.get(`http://192.168.88.34:8000/formations/${formationId}/`),
          axios.get(`http://192.168.88.34:8000/formations/${formationId}/modules/`)
        ]);

        setFormation(formationResponse.data);
        setModules(modulesResponse.data);

        // Tenter de charger le quizz sans bloquer le reste
        try {
          const quizzResponse = await axios.get(`/api/formations/${formationId}/quizz/`);
          if (quizzResponse.data) {
            if (quizzResponse.data.lien_test_niveau) {
              setQuizzLink(quizzResponse.data.lien_test_niveau);
            }
            setQuizzDisponible(true);
          }
        } catch (quizError) {
          console.log("Aucun quiz disponible pour cette formation.");
        }

        setLoading(false);
      } catch (err) {
        console.error('Erreur lors de la récupération des données:', err);
        setError('Impossible de charger les informations de la formation.');
        setLoading(false);
      }
    };

    fetchData();

    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, [formationId]);

  // const handleAddToCart = (module, quantity) => {
  //   if (isNaN(quantity) || quantity < 1) {
  //     alert("Veuillez entrer une quantité valide (min. 1).");
  //     return false;
  //   }
  //   // addToCart(module, quantity, formation ? formation.formation : "Non spécifié");
  //   return true;
  // };

  const handleDownloadClick = () => {
    if (quizzLink) {
      window.open(quizzLink, '_blank');
      setDownloadMessage('Veuillez envoyer les réponses à l\'adresse email indiquée dans le test.');
      setTimeout(() => setDownloadMessage(null), 5000);
    } else {
      setDownloadMessage('Aucun test de niveau disponible pour cette formation.');
      setTimeout(() => setDownloadMessage(null), 5000);
    }
  };

  if (loading) {
    return (
      <div className="py-5 text-center" style={{ fontFamily: "'IBM Plex Mono', monospace", background: "#fffbf5" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
        <p className="mt-2">Chargement des informations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-5 text-center" style={{ fontFamily: "'IBM Plex Mono', monospace", background: "#fffbf5" }}>
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <section className="py-4" style={{ fontFamily: "'IBM Plex Mono', monospace", background: "#fffbf5" }}>
      <div className="container">
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body text-center p-4">
            <h2 className="fw-bold text-success mb-3">{formation.formation}</h2>
            <div
              className="text-muted mb-3"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(formation.descriptions) }}
            />

            <div className="d-flex flex-column align-items-center gap-3 mb-4">
              {/* Bouton "Passer le quizz" si le quiz existe */}
              {quizzDisponible && (
                <Link to={`/quizz/${formation.id}`} className="btn btn-success btn-md">
                  Passer le quizz
                </Link>
              )}

              {/* Bouton "Télécharger le test de niveau" si le lien existe */}
              {quizzLink && (
                <>
                  {isAuthenticated ? (
                    <>
                      <Button variant="success" onClick={handleDownloadClick} className="btn btn-md">
                        Télécharger le test de niveau
                      </Button>
                      <Alert variant="info" className="text-center w-100">
                        Si vous souhaitez aller plus loin, veuillez télécharger ce test et envoyer vos réponses à <strong>contact@gmail.com</strong>.
                      </Alert>
                    </>
                  ) : (
                    <Alert variant="warning" className="text-center w-100">
                      <strong>Connectez-vous pour avoir accès à un test de niveau plus avancé !</strong><br />
                      <Link to="/login" className="btn btn-outline-primary mt-2 btn-sm">Créer un compte</Link>
                    </Alert>
                  )}
                </>
              )}

              {/* Message après clic sur le bouton */}
              {downloadMessage && (
                <Alert variant={quizzLink ? "success" : "warning"} className="text-center w-100">
                  {downloadMessage}
                </Alert>
              )}
            </div>



            {downloadMessage && (
              <Alert variant={quizzLink ? "success" : "warning"} className="mb-3">
                {downloadMessage}
              </Alert>
            )}
          </div>
        </div>

        <h3 className="mb-3 text-center">Modules disponibles</h3>
        <div className="row g-3">
          {modules.length > 0 ? (
            modules.map(module => (
              <div key={module.id} className="col-12 col-sm-6 col-md-6 col-lg-4"> {/* Ajout de col-12 et col-sm-6 */}
                <div className="card module-card h-100 shadow-sm">
                  <div className="position-relative">
                    <img
                      src={module.img}
                      alt={module.module}
                      className="card-img-top"
                      style={{ height: '180px', objectFit: 'cover', borderRadius: "8px 8px 0 0" }}
                    />
                    <div className="position-absolute bottom-0 end-0 p-2">
                      <span className="badge bg-light text-dark shadow-sm">
                        {parseInt(module.duree).toLocaleString('fr-FR')} h
                      </span>
                    </div>
                  </div>

                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{module.module}</h5>
                    <p className="text-primary fw-bold mb-3">{parseInt(module.prix).toLocaleString('fr-FR')} Ar</p>

                    <div className="mt-auto">
                      {/* <div className="input-group mb-2">
                        <input
                          type="number"
                          id={`quantity-${module.id}`}
                          className="form-control"
                          placeholder='Qté'
                          aria-label="Quantité"
                          defaultValue=""
                        />
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            const quantityInput = document.getElementById(`quantity-${module.id}`);
                            const quantity = parseInt(quantityInput.value, 10);

                            if (handleAddToCart(module, quantity)) {
                              quantityInput.value = ""; // Réinitialiser la valeur à 0 après l'ajout réussi
                              // Animation ou retour visuel de succès (peut être ajouté ici)
                            }
                          }}
                        >
                          <i className="bi bi-cart-plus"></i> Ajouter
                        </button>
                      </div> */}
                      <button
                        className="btn btn-outline-secondary w-100"
                        onClick={() => setSelectedModule(module)}
                      >
                        Détails
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <div className="alert alert-info text-center">
                Aucun module disponible pour cette formation.
              </div>
            </div>
          )}
        </div>

        {selectedModule && <ModuleDetails module={selectedModule} onClose={() => setSelectedModule(null)} />}
      </div>

      <style jsx>{`
        .module-card {
          transition: transform 0.3s ease-in-out, box-shadow 0.3s ease;
          border-radius: 8px;
          overflow: hidden;
          border: none;
        }

        .module-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }

        .btn {
          transition: all 0.2s ease;
        }

        .btn:hover {
          transform: scale(1.03);
        }

        .btn-outline-secondary {
          border-color: #e0e0e0;
        }

        .btn-outline-secondary:hover {
          background-color:rgb(38, 216, 133);
        }
      `}</style>
    </section>
  );
};

export default FormationDetails;
