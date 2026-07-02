import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentDashboard from "./pages/StudentDashboard";
import ExamPage from "./pages/ExamPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudentDashboard />} />
        <Route path="/exam" element={<ExamPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;