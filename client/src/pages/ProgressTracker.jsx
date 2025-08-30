import React, { useEffect, useState } from "react";
import axios from "axios";
import Confetti from "react-confetti";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function ProgressTracker() {
  const [progress, setProgress] = useState([]);
  const [form, setForm] = useState({ title: "", category: "" });
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/progress")
      .then((res) => setProgress(res.data))
      .catch((err) => console.error(err));
  }, []);

  const addProgress = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    const res = await axios.post("http://localhost:5000/api/progress", form);
    setProgress([res.data, ...progress]);
    setForm({ title: "", category: "" });

    // 🎊 Confetti celebration
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  };

  // ✅ Weekly Summary
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday
  startOfWeek.setHours(0, 0, 0, 0);

  const weeklyWins = progress.filter(
    (p) => new Date(p.date) >= startOfWeek
  ).length;

  // ✅ Chart Data
  const chartData = Object.values(
    progress.reduce((acc, item) => {
      const cat = item.category || "General";
      acc[cat] = acc[cat] || { category: cat, count: 0 };
      acc[cat].count++;
      return acc;
    }, {})
  );

  return (
    <div
      className="min-vh-100 py-5"
      style={{ background: "linear-gradient(to right, #fffaf0, #fdfdfd)" }}
    >
      {/* 🎊 Confetti */}
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
        />
      )}

      <div className="container">
        <h1 className="text-center fw-bold mb-5 display-5 text-success">
          Family Progress Tracker
        </h1>

        {/* Weekly Summary Widget */}
        <div
          className="card shadow-sm border-0 mx-auto mb-5 rounded-3"
          style={{ maxWidth: "500px", background: "#e9f7ef" }}
        >
          <div className="card-body text-center">
            <h2 className="h4 fw-bold text-success">This Week's Wins 🎉</h2>
            <p className="fs-5 mt-2 text-dark">
              You’ve logged{" "}
              <span className="fw-bolder fs-4">{weeklyWins}</span> wins so far!
            </p>
            {weeklyWins > 0 ? (
              <p className="mb-0 text-muted">
                Keep going — small steps lead to big growth 💪
              </p>
            ) : (
              <p className="mb-0 text-muted">
                No wins yet — start by adding one today 🌟
              </p>
            )}
          </div>
        </div>

        {/* Add Progress Form */}
        <div
          className="card shadow-sm border-0 mx-auto mb-5 rounded-3"
          style={{ maxWidth: "600px" }}
        >
          <div className="card-body">
            <form onSubmit={addProgress}>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Describe your achievement..."
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Category (Family / Work / Kids)"
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  className="form-control"
                />
              </div>
              <button className="btn btn-success w-100 shadow-sm">
                Add Win 🎉
              </button>
            </form>
          </div>
        </div>

        {/* Wins List */}
        <div className="mx-auto mb-5" style={{ maxWidth: "800px" }}>
          {progress.map((p, i) => (
            <div key={i} className="card shadow-sm border-0 mb-3 rounded-3">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="fw-bold text-success mb-1">{p.title}</h5>
                  <small className="text-muted">
                    {p.category || "General"} •{" "}
                    {new Date(p.date).toLocaleDateString()}
                  </small>
                </div>
                <span className="fs-3">✅</span>
              </div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div
          className="card shadow-sm border-0 mx-auto rounded-3"
          style={{ maxWidth: "800px" }}
        >
          <div className="card-body">
            <h2 className="h5 fw-bold text-success mb-4">Wins by Category</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#28a745" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
