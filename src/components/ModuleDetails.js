import React from 'react';

const ModuleDetails = ({ module, onClose }) => {
  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content border-0 shadow-lg rounded bg-white">
          <div className="modal-header border-bottom py-3" style={{ backgroundColor: 'rgba(0, 115, 104, 0.9)' }}>
            <h5 className="modal-title fw-bold text-white fs-5 mb-0">{module.module}</h5>
            <button className="btn-close btn-close-white btn-sm" onClick={onClose}></button>
          </div>
          <div className="modal-body p-4">
            <div className="row g-3">
              <div className="col-12 col-md-4">
                <img
                  src={module.img}
                  alt={module.module}
                  className="img-fluid rounded"
                  style={{ maxHeight: '200px', objectFit: 'cover', width: '100%' }}
                />
              </div>
              <div className="col-12 col-md-8">
                <div className="mb-3">
                  <div className="d-flex justify-content-between mb-2">
                    <div>
                      <p className="fw-bold text-black mb-1 small">Prix :</p>
                      <p className="fw-semibold text-black mb-0 fs-6">{parseInt(module.prix).toLocaleString('fr-FR')} Ar</p>
                    </div>
                    <div>
                      <p className="fw-bold text-black mb-1 small">Durée :</p>
                      <p className="fw-semibold text-black mb-0 fs-6">{parseInt(module.duree).toLocaleString('fr-FR')} heures</p>
                    </div>
                  </div>
                  <hr className="my-3" />
                  <p className="fw-bold text-black mb-1 small">Description :</p>
                  <div
                    className="text-muted small"
                    style={{
                      columnCount: 2, // Nombre de colonnes souhaité
                      columnGap: '20px', // Espacement entre les colonnes
                      overflowY: 'auto', // Peut être nécessaire si le contenu reste trop long
                      maxHeight: '150px', // Vous pouvez ajuster cette hauteur maximale
                    }}
                    dangerouslySetInnerHTML={{ __html: module.descriptions }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer py-3">
            <button className="btn btn-dark btn-sm" onClick={onClose}>Fermer</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleDetails;