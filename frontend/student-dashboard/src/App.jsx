import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentDashboard from "./pages/StudentDashboard";
import ExamPage from "./pages/ExamPage";
import MyResults from "./pages/MyResults";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudentDashboard />} />
        <Route path="/exam" element={<ExamPage />} />
        <Route path="/results" element={<MyResults />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;