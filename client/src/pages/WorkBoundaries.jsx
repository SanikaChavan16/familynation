import React, { useEffect, useState } from "react";
import axios from "axios";
import { ShieldCheck, Clock, Smile } from "lucide-react";

export default function WorkBoundaries() {
  const [tips, setTips] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/work-boundaries")
      .then((res) => setTips(res.data))
      .catch((err) => console.error(err));
  }, []);

  // cycle icons
  const icons = [ShieldCheck, Clock, Smile];

  return (
    <div
      className="min-vh-100 py-5"
      style={{
        background: "linear-gradient(to right, #e3f2fd, #fce4ec)", // soft pastel
      }}
    >
      <div className="container">
        <h1 className="text-center text-dark fw-bold mb-5 display-5">
          Work Boundaries Strategies
        </h1>

        <div className="row g-4">
          {tips.map((tip, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div key={i} className="col-md-6 col-lg-4">
                <div
                  className="card shadow-sm h-100 border-0 text-center p-4"
                  style={{ borderRadius: "14px" }}
                >
                  {/* Icon */}
                  <div
                    className="d-flex align-items-center justify-content-center bg-light rounded-circle mx-auto mb-3"
                    style={{ width: "70px", height: "70px" }}
                  >
                    <Icon size={32} className="text-primary" />
                  </div>

                  {/* Title */}
                  <h5 className="fw-bold text-dark">{tip.title}</h5>

                  {/* Description */}
                  <p className="text-muted small">{tip.description}</p>

                  {/* Button */}
                  <button className="btn btn-gradient mt-auto shadow-sm">
                    Try This
                  </button>
                </div>
              </div>
            );
          })}

          {tips.length === 0 && (
            <p className="text-center text-muted">
              No strategies available yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
