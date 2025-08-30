import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ConflictResolution() {
  const [strategies, setStrategies] = useState([]);
  const [selectedAge, setSelectedAge] = useState("");
  const [activeStrategy, setActiveStrategy] = useState(null);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/conflict-resolution")
      .then((res) => setStrategies(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filtered = selectedAge
    ? strategies.filter((s) => s.ageGroup === selectedAge)
    : strategies;

  return (
    <div
      className="min-vh-100 py-5"
      style={{ background: "linear-gradient(to right, #fdfbfb, #ebedee)" }}
    >
      <div className="container">
        <h1 className="text-center fw-bold text-danger mb-5 display-5">
          Conflict Resolution Strategies
        </h1>

        {/* Age Group Filter */}
        <div className="text-center mb-4">
          <select
            value={selectedAge}
            onChange={(e) => setSelectedAge(e.target.value)}
            className="form-select w-auto d-inline-block shadow-sm"
          >
            <option value="">All Age Groups</option>
            <option value="5-8 years">👶 5-8 years</option>
            <option value="9-12 years">🧒 9-12 years</option>
            <option value="Teens">👦 Teens</option>
          </select>
        </div>

        {/* Strategy Cards */}
        <div className="row g-4">
          {filtered.map((s, i) => (
            <div key={i} className="col-md-6 col-lg-4">
              <div className="card shadow-lg border-0 rounded-3 h-100">
                <div className="card-body d-flex flex-column text-center">
                  <h5 className="fw-bold text-dark mb-2">{s.title}</h5>
                  <p className="text-muted small flex-grow-1">{s.description}</p>
                  <button
                    onClick={() => {
                      setActiveStrategy(s);
                      setStepIndex(0);
                    }}
                    className="btn btn-danger mt-3 shadow-sm"
                  >
                    Start Guidance →
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="text-center text-muted">No strategies available.</p>
          )}
        </div>
      </div>

      {/* Modal for Steps */}
      {activeStrategy && (
        <div
          className="modal fade show d-block"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow-lg rounded-3">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title fw-bold">
                  {activeStrategy.title}
                </h5>
                <button
                  className="btn-close btn-close-white"
                  onClick={() => setActiveStrategy(null)}
                ></button>
              </div>

              <div className="modal-body text-center">
                <p className="fs-5 text-dark">{activeStrategy.steps[stepIndex]}</p>
              </div>

              <div className="modal-footer d-flex justify-content-between align-items-center">
                <button
                  disabled={stepIndex === 0}
                  onClick={() => setStepIndex((prev) => prev - 1)}
                  className="btn btn-outline-secondary"
                >
                  Back
                </button>
                <small className="text-muted">
                  Step {stepIndex + 1} of {activeStrategy.steps.length}
                </small>
                <button
                  disabled={stepIndex === activeStrategy.steps.length - 1}
                  onClick={() => setStepIndex((prev) => prev + 1)}
                  className="btn btn-danger"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
