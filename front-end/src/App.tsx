import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import DoashBoard from './admin/DoashBoard';
import StudentManager from './admin/StudentManager';
import TeacherManager from './admin/TeacherManager';
import CoursesManager from './admin/CoursesManager';
import InfoTeacher from './admin/InfoTeacher';

function App() {
  return (
    <div className="App">
      <Router>
        {/* menu */}
        <Routes>
          <Route path="/admin" element={<DoashBoard />} />
          <Route path="/admin/student" element={<StudentManager />} />
          <Route path="/admin/teacher" element={<TeacherManager />} />
          <Route path="/admin/teacher-info" element={<InfoTeacher />} />
          <Route path="/admin/courses" element={<CoursesManager />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
