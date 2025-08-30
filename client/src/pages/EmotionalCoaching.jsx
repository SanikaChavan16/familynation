import React, { useEffect, useState } from "react";
import axios from "axios";

export default function EmotionalCoaching() {
  const [modules, setModules] = useState([]);
  const [activeModule, setActiveModule] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/emotional-coaching`)
      .then((res) => setModules(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div
      className="min-vh-100 py-5"
      style={{ background: "linear-gradient(to right, #e3f2fd, #fce4ec)" }}
    >
      <div className="container">
        <h1 className="text-center fw-bold text-dark mb-5 display-5">
          Emotional Coaching Modules
        </h1>

        {/* Module List */}
        <div className="row g-4">
          {modules.map((m, i) => (
            <div key={i} className="col-md-6 col-lg-4">
              <div className="card shadow-sm border-0 h-100" style={{ borderRadius: "14px" }}>
                <div className="card-body d-flex flex-column">
                  <h5 className="fw-bold text-dark">{m.title}</h5>
                  <p className="text-muted">{m.description}</p>
                  <button
                    onClick={() => setActiveModule(m)}
                    className="btn btn-gradient mt-auto shadow-sm"
                  >
                    Start Module
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Steps Modal */}
      {activeModule && (
        <div
          className="modal fade show d-block"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow-lg" style={{ borderRadius: "14px" }}>
              {/* Header */}
              <div
                className="modal-header"
                style={{
                  background: "linear-gradient(90deg, #42a5f5, #7e57c2)",
                  color: "white",
                }}
              >
                <h5 className="modal-title fw-bold">{activeModule.title}</h5>
                <button
                  className="btn-close btn-close-white"
                  onClick={() => setActiveModule(null)}
                ></button>
              </div>

              {/* Steps */}
              <div className="modal-body">
                <ul className="list-group list-group-flush">
                  {activeModule.steps.map((s, idx) => (
                    <li key={idx} className="list-group-item">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer */}
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setActiveModule(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
