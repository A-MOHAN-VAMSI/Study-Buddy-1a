import { useEffect, useState } from "react";
import axios from "axios";

function ManageStudents() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/students"
      );

      setStudents(res.data.students);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteStudent = async (id) => {
    if (!window.confirm("Delete this student?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/students/${id}`
      );

      fetchStudents();
    } catch (err) {
      console.error(err);
      alert("Unable to delete student.");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "25px" }}>
        Manage Students
      </h1>

      <div
        style={{
          background: "#fff",
          borderRadius: "14px",
          overflow: "hidden",
          boxShadow: "0 2px 10px rgba(0,0,0,.08)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr
              style={{
                background: "#f8fafc",
              }}
            >
              <th style={{ padding: "16px", textAlign: "left" }}>
                Name
              </th>

              <th style={{ padding: "16px", textAlign: "left" }}>
                Email
              </th>

              <th style={{ padding: "16px", textAlign: "left" }}>
                Joined
              </th>

              <th style={{ padding: "16px", textAlign: "left" }}>
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr
                key={student.id}
                style={{
                  borderTop: "1px solid #f1f5f9",
                }}
              >
                <td style={{ padding: "16px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <div
                      style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "50%",
                        background: "#3b82f6",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                        fontSize: "18px",
                      }}
                    >
                      {student.name.charAt(0).toUpperCase()}
                    </div>

                    <span>{student.name}</span>
                  </div>
                </td>

                <td style={{ padding: "16px" }}>
                  {student.email}
                </td>

                <td style={{ padding: "16px" }}>
                  {new Date(
                    student.created_at
                  ).toLocaleDateString()}
                </td>

                <td style={{ padding: "16px" }}>
                  <button
                    onClick={() =>
                      deleteStudent(student.id)
                    }
                    style={{
                      background: "#ef4444",
                      color: "#fff",
                      border: "none",
                      padding: "8px 15px",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}

            {students.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  style={{
                    padding: "25px",
                    textAlign: "center",
                  }}
                >
                  No Students Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageStudents;