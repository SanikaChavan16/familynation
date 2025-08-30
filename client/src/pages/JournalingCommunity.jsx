import React, { useEffect, useState } from "react";
import axios from "axios";

export default function JournalingCommunity() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ user: "Anonymous", content: "" });
  const [commentText, setCommentText] = useState({}); // track per-entry comments

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/journals")
      .then((res) => setEntries(res.data))
      .catch((err) => console.error(err));
  }, []);

  const addEntry = async (e) => {
    e.preventDefault();
    if (!form.content.trim()) return;
    const res = await axios.post("http://localhost:5000/api/journals", form);
    setEntries([res.data, ...entries]);
    setForm({ ...form, content: "" });
  };

  const likeEntry = async (id) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/journals/${id}/like`
      );
      setEntries(entries.map((e) => (e._id === id ? res.data : e)));
    } catch (err) {
      console.error("Failed to like entry", err);
    }
  };

  const addComment = async (id) => {
    if (!commentText[id] || !commentText[id].trim()) return;
    try {
      const res = await axios.post(
        `http://localhost:5000/api/journals/${id}/comment`,
        {
          user: "Supportive Friend",
          text: commentText[id],
        }
      );
      setEntries(entries.map((e) => (e._id === id ? res.data : e)));
      setCommentText({ ...commentText, [id]: "" });
    } catch (err) {
      console.error("Failed to add comment", err);
    }
  };

  return (
    <div
      className="min-vh-100 py-5"
      style={{ background: "linear-gradient(to right, #fbc2eb, #a6c1ee)" }}
    >
      <div className="container">
        <h1 className="text-center fw-bold text-purple mb-5 display-5">
          Journaling & Community
        </h1>

        {/* Journal Form */}
        <div
          className="card shadow-lg border-0 mx-auto mb-5"
          style={{ maxWidth: "600px" }}
        >
          <div className="card-body">
            <form onSubmit={addEntry}>
              <div className="mb-3">
                <textarea
                  placeholder="Write your thoughts here..."
                  value={form.content}
                  onChange={(e) =>
                    setForm({ ...form, content: e.target.value })
                  }
                  className="form-control"
                  rows="4"
                />
              </div>
              <button className="btn btn-primary w-100">Share Entry</button>
            </form>
          </div>
        </div>

        {/* Community Feed */}
        <div className="mx-auto" style={{ maxWidth: "800px" }}>
          {entries.map((entry, i) => (
            <div key={i} className="card shadow-sm border-0 mb-4">
              <div className="card-body">
                <h5 className="fw-bold text-primary">
                  {entry.user || "Anonymous"}
                </h5>
                <p className="mt-2">{entry.content}</p>
                <small className="text-muted">
                  {new Date(entry.createdAt).toLocaleString()}
                </small>

                {/* ❤️ Like Button */}
                <div className="mt-3 d-flex align-items-center gap-2">
                  <button
                    onClick={() => likeEntry(entry._id)}
                    className="btn btn-sm btn-danger"
                  >
                    ❤️ Support
                  </button>
                  <span className="text-muted">{entry.likes} supports</span>
                </div>

                {/* 💬 Comments */}
                <div className="mt-4">
                  <h6 className="fw-bold">Comments</h6>
                  <div className="mb-3">
                    {entry.comments &&
                      entry.comments.map((c, idx) => (
                        <div key={idx} className="p-2 bg-light rounded mb-2">
                          <p className="mb-1">
                            <span className="fw-semibold text-primary">
                              {c.user}:
                            </span>{" "}
                            {c.text}
                          </p>
                          <small className="text-muted">
                            {new Date(c.createdAt).toLocaleString()}
                          </small>
                        </div>
                      ))}
                  </div>

                  {/* Add Comment Form */}
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      value={commentText[entry._id] || ""}
                      onChange={(e) =>
                        setCommentText({
                          ...commentText,
                          [entry._id]: e.target.value,
                        })
                      }
                      className="form-control"
                    />
                    <button
                      onClick={() => addComment(entry._id)}
                      className="btn btn-primary"
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {entries.length === 0 && (
            <p className="text-center text-muted">
              No journal entries yet. Start by sharing your thoughts 🌸
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
