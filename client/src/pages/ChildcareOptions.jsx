import React, { useEffect, useState } from "react";
import axios from "axios";

const cities = ["Pune", "Mumbai", "Delhi"];

export default function ChildcareOptions() {
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/childcare/${selectedCity}`)
      .then((res) => setProviders(res.data))
      .catch((err) => console.error(err));
  }, [selectedCity]);

  return (
    <div
      className="min-vh-100 py-5"
      style={{
        background: "linear-gradient(to right, #e3f2fd, #fce4ec)", // light theme
      }}
    >
      <div className="container">
        <h1 className="text-center fw-bold text-dark mb-5 display-5">
          Backup Childcare Options 👶
        </h1>

        {/* City Selector */}
        <div className="d-flex justify-content-center mb-4">
          <select
            className="form-select shadow-sm w-auto"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            {cities.map((city, i) => (
              <option key={i} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Providers List */}
        <div className="row g-4">
          {providers.length > 0 ? (
            providers.map((p, i) => (
              <div key={i} className="col-md-6 col-lg-4">
                <div className="card h-100">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold text-dark">{p.name}</h5>
                    <p className="card-text text-muted mb-1">{p.address}</p>
                    <p className="card-text small text-secondary">
                      📞 {p.contact}
                    </p>
                    <p className="text-warning fw-semibold">
                      ⭐ {p.rating || "N/A"}
                    </p>

                    <button
                      onClick={() =>
                        alert(`✅ Saved ${p.name} as backup childcare`)
                      }
                      className="btn btn-gradient mt-auto"
                    >
                      Save as Backup
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted">
              No childcare providers found in {selectedCity}.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
