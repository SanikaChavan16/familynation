import React, { useEffect, useState } from "react";
import axios from "axios";

export default function OnDemandSupport() {
  const [experts, setExperts] = useState([]);
  const [filter, setFilter] = useState("");
  const [chatExpert, setChatExpert] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/experts`)
      .then((res) => setExperts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filteredExperts = filter
    ? experts.filter((e) =>
        e.specialty.toLowerCase().includes(filter.toLowerCase())
      )
    : experts;

  const sendMessage = () => {
    if (!chatInput.trim()) return;

    const userMsg = { sender: "You", text: chatInput };
    setChatMessages([...chatMessages, userMsg]);
    setChatInput("");

    // Simulated expert reply
    setTimeout(() => {
      const replies = [
        "I hear you, let’s take a deep breath together 🌿",
        "That sounds tough. Can you share a little more?",
        "You're not alone — many parents go through this ❤️",
        "Let’s try breaking the problem into small steps 👍",
      ];
      const expertMsg = {
        sender: chatExpert?.name || "Expert",
        text: replies[Math.floor(Math.random() * replies.length)],
      };
      setChatMessages((msgs) => [...msgs, expertMsg]);
    }, 1500);
  };

  return (
    <div
      className="min-vh-100 py-5"
      style={{ background: "linear-gradient(to right, #eef2f3, #f9f9f9)" }}
    >
      <div className="container">
        <h1 className="text-center fw-bold text-dark mb-5 display-5">
          On-Demand Professional Support
        </h1>

        {/* Filter */}
        <div className="text-center mb-4">
          <input
            type="text"
            placeholder="Search by specialty (e.g. Parenting, Stress)"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="form-control w-50 mx-auto shadow-sm rounded-3"
          />
        </div>

        {/* Experts Grid */}
        <div className="row g-4">
          {filteredExperts.map((expert, i) => (
            <div key={i} className="col-md-6 col-lg-4">
              <div className="card shadow-lg border-0 rounded-3 h-100">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex align-items-center mb-2">
                    {/* Availability small badge on left */}
                    <span
                      className={`badge rounded-pill me-2 px-3 ${
                        expert.availability === "Available"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {expert.availability}
                    </span>
                    <h5 className="fw-bold text-dark mb-0">{expert.name}</h5>
                  </div>

                  <p className="text-muted">{expert.specialty}</p>

                  <button
                    className={`btn mt-auto shadow-sm ${
                      expert.availability === "Available"
                        ? "btn-primary"
                        : "btn-secondary disabled"
                    }`}
                    disabled={expert.availability !== "Available"}
                    onClick={() => {
                      setChatExpert(expert);
                      setChatMessages([]);
                    }}
                  >
                    {expert.availability === "Available"
                      ? "Request Help"
                      : "Not Available"}
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filteredExperts.length === 0 && (
            <p className="text-center text-muted">No experts found.</p>
          )}
        </div>
      </div>

      {/* Chat Modal */}
      {chatExpert && (
        <div
          className="modal fade show d-block"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow-lg rounded-3">
              {/* Header */}
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title fw-bold">
                  Chat with {chatExpert.name}
                </h5>
                <button
                  onClick={() => setChatExpert(null)}
                  className="btn-close btn-close-white"
                ></button>
              </div>

              {/* Messages */}
              <div
                className="modal-body"
                style={{ maxHeight: "400px", overflowY: "auto" }}
              >
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`d-flex mb-3 ${
                      msg.sender === "You"
                        ? "justify-content-end"
                        : "justify-content-start"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-3 shadow-sm ${
                        msg.sender === "You"
                          ? "bg-primary text-white"
                          : "bg-light border"
                      }`}
                      style={{ maxWidth: "75%" }}
                    >
                      <small className="fw-bold d-block">{msg.sender}</small>
                      <span>{msg.text}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="modal-footer d-flex">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="form-control me-2"
                />
                <button onClick={sendMessage} className="btn btn-primary">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
