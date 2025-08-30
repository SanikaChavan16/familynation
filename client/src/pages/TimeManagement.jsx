import React, { useEffect, useState } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function TimeManagement() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", date: "", time: "", category: "" });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tasks")
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (!form.title || !form.date || !form.time) return;
    const res = await axios.post("http://localhost:5000/api/tasks", form);
    setTasks([...tasks, res.data]);
    setForm({ title: "", date: "", time: "", category: "" });
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    setTasks(tasks.filter((t) => t._id !== id));
  };

  const events = tasks.map((t) => ({
    id: t._id,
    title: `${t.title} (${t.category || "General"})`,
    start: `${t.date}T${t.time}`,
  }));

  return (
    <div
      className="min-vh-100 py-5"
      style={{ background: "linear-gradient(to right, #e3f2fd, #fce4ec)" }}
    >
      <div className="container">
        <h1 className="text-center fw-bold text-dark mb-5 display-5">
          Time Management Planner
        </h1>

        {/* Task Form */}
        <div
          className="card shadow-sm border-0 mb-5 mx-auto"
          style={{ maxWidth: "600px", borderRadius: "14px" }}
        >
          <div className="card-body">
            <form onSubmit={addTask}>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Task Title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="row mb-3">
                <div className="col">
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="form-control"
                  />
                </div>
                <div className="col">
                  <input
                    type="time"
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Category (Work / Family)"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="form-control"
                />
              </div>
              <button className="btn btn-gradient w-100">Add Task</button>
            </form>
          </div>
        </div>

        {/* Calendar */}
        <div
          className="card shadow-sm border-0 mx-auto"
          style={{ maxWidth: "1000px", borderRadius: "14px" }}
        >
          <div className="card-body">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              events={events}
              eventClick={(info) => {
                if (window.confirm(`Delete task: ${info.event.title}?`)) {
                  deleteTask(info.event.id);
                }
              }}
              height="auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
