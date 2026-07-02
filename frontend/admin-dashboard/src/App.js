import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Adminsidebar from './components/admin/Adminsidebar'
import AdminHome from './pages/admin/AdminHome'
import ManageExams from './pages/admin/ManageExams'
import QuestionBank from './pages/admin/QuestionBank'
import ManageStudents from './pages/admin/ManageStudents'

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex' }}>
        <Adminsidebar />
        <div style={{ padding: '20px', flex: 1 }}>
          <Routes>
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/admin/exams" element={<ManageExams />} />
            <Route path="/admin/questions" element={<QuestionBank />} />
             <Route path="/admin/students" element={<ManageStudents />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App

