import { useEffect, useState } from "react";

import axios from "axios";

function AdminHome() {
  const [stats, setStats] = useState({
    totalExams: 0,
    totalStudents: 0,
    totalQuestions: 0,
    publishedResults: 0,
  });
  console.log("Current Stats:", stats);

  useEffect(() => {
    fetchDashboard();
  }, []);
  

 const fetchDashboard = async () => {
  console.log("fetchDashboard called");

  try {
    const res = await axios.get(
      "http://localhost:5000/api/admin/dashboard"
    );

    console.log("FULL RESPONSE:", res);
    console.log("DATA:", res.data);

    const newStats = {
      totalExams: Number(res.data.totalExams),
      totalStudents: Number(res.data.totalStudents),
      totalQuestions: Number(res.data.totalQuestions),
      publishedResults: Number(res.data.publishedResults),
    };

    console.log("SETTING:", newStats);

    setStats(newStats);

  } catch (err) {
    console.error("ERROR:", err);
  }
};
useEffect(() => {
  console.log("Stats changed:", stats);
}, [stats]);

  const cards = [
    {
      label: "Total Exams",
      value: stats.totalExams,
      color: "#3b82f6",
      icon: "📝",
    },
    {
      label: "Total Students",
      value: stats.totalStudents,
      color: "#10b981",
      icon: "👨‍🎓",
    },
    {
      label: "Total Questions",
      value: stats.totalQuestions,
      color: "#f59e0b",
      icon: "❓",
    },
    {
      label: "Results Published",
      value: stats.publishedResults,
      color: "#8b5cf6",
      icon: "📊",
    },
  ];

  return (
    <div style={{ padding: "30px" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "8px" }}>
        Welcome, Admin 👋
      </h1>

      <p style={{ color: "#64748b", marginBottom: "30px" }}>
        Here's what's happening today.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
          gap: "20px",
        }}
      >
        {cards.map((card) => (
          <div
            key={card.label}
            style={{
              background: "#fff",
              borderRadius: "14px",
              padding: "24px",
              borderLeft: `5px solid ${card.color}`,
              boxShadow: "0 2px 10px rgba(0,0,0,.06)",
            }}
          >
            <div style={{ fontSize: "28px", marginBottom: "10px" }}>
              {card.icon}
            </div>

            <p style={{ color: "#64748b", fontSize: "14px" }}>
              {card.label}
            </p>

            <h2
              style={{
                fontSize: "32px",
                color: card.color,
                fontWeight: "700",
              }}
            >
              {card.value}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminHome;