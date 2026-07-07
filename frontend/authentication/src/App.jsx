import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./routes/ProtectedRoute";
import AdminHome from "./admin/AdminHome";
import ManageStudents from "./admin/ManageStudents";
import ManageExams from "./admin/ManageExams";
import QuestionBank from "./admin/QuestionBank";

function App() {
  return (
    <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/admin" element={<AdminHome />} />

<Route path="/admin/students" element={<ManageStudents />} />

<Route path="/admin/exams" element={<ManageExams />} />

<Route path="/admin/questions" element={<QuestionBank />} />

    <Route
        path="/dashboard"
        element={
            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
        }
    />
</Routes>
  );
}

export default App;