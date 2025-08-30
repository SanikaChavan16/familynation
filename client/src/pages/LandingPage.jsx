import React from "react";
import { useNavigate } from "react-router-dom";

const stories = [
    {
    title: "On-Demand Support",
    desc: "Access professional advice during crisis moments.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQnrk3OyMjb9qPnsH-35Rk3g26llrHruj00FuMI-GefFSpmWDWjW7QVCj3iuuDM3DdyxI&usqp=CAU",
    path: "/support",
  },
  
  {
    title: "Work Boundaries",
    desc: "Set limits with kids during client meetings.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT656Gnlb3Z-Q5Ws-oZbBBVwto5v_Cxu_McuQ&s",
    path: "/work",
  },
  {
    title: "Emotional Coaching",
    desc: "Help children handle stress, homework, and social issues.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRslrTwzCguFN2nLh690uxwAADVpDyrs3FmYMvtHkWc-OZ0HzSOFt3RddbudVC-XtkuuII&usqp=CAU",
    path: "/emotions",
  },
  {
    title: "Time Management",
    desc: "Plan daily schedules to balance family and work.",
    img: "https://blog.eduplusnow.com/blog/wp-content/uploads/2024/10/What-Are-Time-Management-Skills-1024x682.jpg",
    path: "/time",
  },
  {
    title: "Conflict Resolution",
    desc: "Strategies to resolve sibling disputes peacefully.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_kaf_Dho70_FvJMYs0NbImdjgluV5BCgsj-X3TjHaVR68fU6uZVJdUyI85nAiNpclQKU&usqp=CAU",
    path: "/conflict",
  },
  {
    title: "Journaling & Community",
    desc: "Reflect through journaling and connect with others.",
    img: "https://habitaware.com/cdn/shop/articles/HabitAware-Trichotillomania-Dermatillomania-Bullet-Journal-Community.png?v=1553088897",
    path: "/journaling",
  },
  {
    title: "Progress Tracker",
    desc: "Celebrate wins and track family growth.",
    img: "https://static.vecteezy.com/system/resources/previews/013/055/209/non_2x/project-tracking-goal-tracker-task-completion-or-checklist-to-remind-project-progress-concept-businessman-project-manager-holding-big-pencil-to-check-completed-tasks-in-project-management-timeline-free-vector.jpg",
    path: "/progress",
  },
  
  {
    title: "Screen Time Balance",
    desc: "Peacefully set screen time rules at home.",
    img: "https://www.internetsafetystatistics.com/wp-content/uploads/2024/04/Depositphotos_714241680_XL-880x376.webp",
    path: "/screentime",
  },
  {
    title: "Morning Communication",
    desc: "Guided exercises to handle morning conflicts smoothly.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFUq_JQhsvrVjDDlz8iWueq2pvSQG4t6lRf2W2_JXj4s5DrG94ja1_9koERS3FNGzdg8A&usqp=CAU",
    path: "/communication",
  },
  {
    title: "Backup Childcare",
    desc: "Find reliable childcare providers when schedules change.",
    img: "https://mir-s3-cdn-cf.behance.net/projects/404/ae122d211038789.Y3JvcCwxMjAwLDkzOCwwLDEx.jpg",
    path: "/childcare",
  }
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div
      className="min-vh-100 d-flex flex-column"
      style={{
        background: "linear-gradient(to right, #f8fbff, #eef2f3)",
        padding: "40px",
      }}
    >
      <h1 className="text-center text-dark fw-bold mb-3 display-4">
        Welcome to FamilyNation
      </h1>
      <p className="text-center text-muted mb-5 fs-5">
        Choose a journey to support your family today
      </p>

      <div className="container">
        <div className="row g-4">
          {stories.map((story, i) => (
            <div key={i} className="col-sm-6 col-lg-4">
              <div className="card shadow-lg h-100 border-0 rounded-3">
                <img
                  src={story.img}
                  className="card-img-top rounded-top"
                  alt={story.title}
                  style={{ height: "200px", objectFit: "cover" }}
                  onError={(e) =>
                    (e.target.src = "https://picsum.photos/400/250")
                  }
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold">{story.title}</h5>
                  <p className="card-text flex-grow-1">{story.desc}</p>
                  <button
                    onClick={() => navigate(story.path)}
                    className="btn btn-primary w-100 mt-3 shadow-sm"
                  >
                    Explore →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
