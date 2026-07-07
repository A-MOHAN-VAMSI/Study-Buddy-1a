import { useState, useEffect } from "react";
import { getMyResults, downloadResultPDF } from "../services/resultService";

function MyResults() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await getMyResults(token);
                setResults(res.data.results);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to load results.");
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, []);

    const handleDownloadPDF = async (resultId) => {
        try {
            const token = localStorage.getItem("token");
            const res = await downloadResultPDF(resultId, token);

            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `result-${resultId}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            alert("Failed to download PDF.");
        }
    };

    if (loading) {
        return (
            <div style={{ padding: "30px", textAlign: "center" }}>
                Loading results...
            </div>
        );
    }

    return (
        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#f4f7fc",
                padding: "30px"
            }}
        >
            <div
                style={{
                    maxWidth: "900px",
                    margin: "0 auto",
                    background: "#fff",
                    borderRadius: "14px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    padding: "30px"
                }}
            >
                <h1 style={{ color: "#1e3a8a", marginBottom: "8px" }}>
                    My Results
                </h1>
                <p style={{ color: "#64748b", marginBottom: "24px" }}>
                    Your exam result history.
                </p>

                {error && (
                    <p style={{ color: "#dc2626", marginBottom: "16px" }}>{error}</p>
                )}

                {results.length === 0 && !error ? (
                    <p style={{ color: "#64748b", textAlign: "center", padding: "40px 0" }}>
                        No results found. Take an exam to see your results here.
                    </p>
                ) : (
                    <table
                        style={{
                            width: "100%",
                            borderCollapse: "collapse"
                        }}
                    >
                        <thead>
                            <tr style={{ backgroundColor: "#f8fafc" }}>
                                <th style={thStyle}>Exam Title</th>
                                <th style={thStyle}>Score</th>
                                <th style={thStyle}>Percentage</th>
                                <th style={thStyle}>Status</th>
                                <th style={thStyle}>Date</th>
                                <th style={thStyle}>Certificate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((result) => {
                                const passed = result.percentage >= 40;
                                const date = new Date(result.submitted_at).toLocaleDateString(
                                    "en-IN",
                                    { day: "2-digit", month: "short", year: "numeric" }
                                );
                                return (
                                    <tr
                                        key={result.id}
                                        style={{ borderTop: "1px solid #f1f5f9" }}
                                    >
                                        <td style={tdStyle}>{result.exam_title}</td>
                                        <td style={tdStyle}>{result.score}</td>
                                        <td style={tdStyle}>
                                            {parseFloat(result.percentage).toFixed(2)}%
                                        </td>
                                        <td style={tdStyle}>
                                            <span
                                                style={{
                                                    padding: "4px 12px",
                                                    borderRadius: "20px",
                                                    fontSize: "13px",
                                                    fontWeight: "600",
                                                    backgroundColor: passed ? "#d1fae5" : "#fee2e2",
                                                    color: passed ? "#065f46" : "#dc2626"
                                                }}
                                            >
                                                {passed ? "PASS" : "FAIL"}
                                            </span>
                                        </td>
                                        <td style={{ ...tdStyle, color: "#64748b" }}>{date}</td>
                                        <td style={tdStyle}>
                                            <button
                                                onClick={() => handleDownloadPDF(result.id)}
                                                style={{
                                                    backgroundColor: "#eff6ff",
                                                    color: "#2563eb",
                                                    border: "none",
                                                    borderRadius: "8px",
                                                    padding: "6px 14px",
                                                    cursor: "pointer",
                                                    fontWeight: "500",
                                                    fontSize: "13px"
                                                }}
                                            >
                                                ⬇ Download PDF
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

const thStyle = {
    padding: "14px 16px",
    textAlign: "left",
    color: "#64748b",
    fontWeight: "600",
    fontSize: "14px"
};

const tdStyle = {
    padding: "14px 16px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#1e293b"
};

export default MyResults;
