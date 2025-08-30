import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ScreenTimeBalance() {
  const [strategies, setStrategies] = useState([]);
  const [activeTimer, setActiveTimer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/screen-time`)
      .then((res) => setStrategies(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Countdown effect
  useEffect(() => {
    if (timeLeft <= 0 || !activeTimer) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          alert("⏰ Time’s up! Screens off 🌙📵");
          setActiveTimer(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, activeTimer]);

  // Convert seconds → mm:ss
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className="min-vh-100 py-5"
      style={{ background: "linear-gradient(to right, #e0c3fc, #8ec5fc)" }}
    >
      <div className="container">
        <h1 className="text-center text-dark fw-bold mb-5 display-5">
          Screen Time Balance Before Bed
        </h1>

        {/* Active Timer Display */}
        {activeTimer && (
          <div className="card shadow-lg border-0 text-center text-white bg-primary mb-5 mx-auto"
               style={{ maxWidth: "500px" }}>
            <div className="card-body">
              <h2 className="h4 fw-bold mb-3">⏳ Screen Time Countdown</h2>
              <p className="display-4 fw-bold">{formatTime(timeLeft)}</p>
              <p className="mt-2">
                Strategy: <span className="fw-semibold">{activeTimer}</span>
              </p>
            </div>
          </div>
        )}

        {/* Strategies Grid */}
        <div className="row g-4">
          {strategies.map((s, i) => (
            <div key={i} className="col-md-6 col-lg-4">
              <div className="card shadow-lg h-100 border-0">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold">{s.title}</h5>
                  <p className="text-muted">{s.description}</p>
                  <ul className="text-start small mb-3">
                    {s.tips.map((tip, idx) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>

                  {/* Start Timer Button */}
                  <button
                    onClick={() => {
                      const minutes = parseInt(
                        prompt("⏳ Enter screen time minutes:", 30)
                      );
                      if (!isNaN(minutes) && minutes > 0) {
                        setTimeLeft(minutes * 60);
                        setActiveTimer(s.title);
                      }
                    }}
                    className="btn btn-primary mt-auto"
                  >
                    Start Timer
                  </button>
                </div>
              </div>
            </div>
          ))}

          {strategies.length === 0 && (
            <p className="text-center text-muted">No strategies available yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
