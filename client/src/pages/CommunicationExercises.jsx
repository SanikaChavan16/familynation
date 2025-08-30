import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CommunicationExercises() {
  const [exercises, setExercises] = useState([]);
  const [completed, setCompleted] = useState([]); // ✅ local completed IDs
  const [activeExercise, setActiveExercise] = useState(null);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/exercises")
      .then((res) => setExercises(res.data))
      .catch((err) => console.error(err));
  }, []);

  const markCompleted = (id) => {
    setCompleted([...completed, id]); // frontend only
    setActiveExercise(null);
  };

  return (
    <div
      className="min-vh-100 py-5"
      style={{
        background: "linear-gradient(to right, #e0f7fa, #fce4ec)", // light teal → light pink
      }}
    >
      <div className="container">
        <h1 className="text-center fw-bold text-dark mb-5 display-5">
          Morning Communication Exercises
        </h1>

        {/* Exercise Cards */}
        <div className="row g-4">
          {exercises.map((ex, i) => (
            <div key={i} className="col-md-6 col-lg-4">
              <div
                className={`card shadow-sm border-0 h-100 position-relative ${
                  completed.includes(ex._id)
                    ? "border border-success border-3"
                    : ""
                }`}
                style={{ borderRadius: "12px" }}
              >
                <div className="card-body d-flex flex-column">
                  <h5 className="fw-bold text-dark">{ex.title}</h5>

                  {/* ✅ Completed Badge */}
                  {completed.includes(ex._id) && (
                    <span className="badge bg-success position-absolute top-0 end-0 m-2">
                      ✅ Completed
                    </span>
                  )}

                  <button
                    onClick={() => {
                      setActiveExercise(ex);
                      setStepIndex(0);
                    }}
                    className="btn mt-auto text-white"
                    style={{
                      background: "linear-gradient(90deg, #42a5f5, #7e57c2)", // soft blue → purple
                      border: "none",
                    }}
                  >
                    Start Exercise
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Steps */}
      {activeExercise && (
        <div
          className="modal fade show d-block"
          style={{ background: "rgba(0,0,0,0.4)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div
              className="modal-content shadow border-0"
              style={{ borderRadius: "14px" }}
            >
              {/* Header */}
              <div
                className="modal-header text-white"
                style={{
                  background: "linear-gradient(90deg, #42a5f5, #7e57c2)", // soft blue → purple
                  borderTopLeftRadius: "14px",
                  borderTopRightRadius: "14px",
                }}
              >
                <h5 className="modal-title fw-bold">{activeExercise.title}</h5>
                <button
                  className="btn-close btn-close-white"
                  onClick={() => setActiveExercise(null)}
                ></button>
              </div>

              {/* Body */}
              <div className="modal-body">
                <p className="fs-5 text-secondary">
                  {activeExercise.steps[stepIndex]}
                </p>

                <div className="d-flex justify-content-between mt-4">
                  <button
                    disabled={stepIndex === 0}
                    onClick={() => setStepIndex((prev) => prev - 1)}
                    className="btn btn-outline-secondary"
                  >
                    Back
                  </button>
                  <button
                    disabled={stepIndex === activeExercise.steps.length - 1}
                    onClick={() => setStepIndex((prev) => prev + 1)}
                    className="btn text-white"
                    style={{
                      background: "linear-gradient(90deg, #42a5f5, #7e57c2)",
                      border: "none",
                    }}
                  >
                    Next →
                  </button>
                </div>

                {/* ✅ Mark as Completed */}
                {!completed.includes(activeExercise._id) && (
                  <button
                    onClick={() => markCompleted(activeExercise._id)}
                    className="btn btn-success w-100 mt-3"
                  >
                    ✅ Mark as Completed
                  </button>
                )}

                <p className="text-center text-muted mt-3 small">
                  Step {stepIndex + 1} of {activeExercise.steps.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
