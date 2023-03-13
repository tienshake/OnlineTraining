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
import InfoCourses from './admin/InfoCourses';
import AddTeacher from './admin/AddTeacher';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Admin */}
          <Route path="/admin" element={<DoashBoard />} />
          <Route path="/admin/student" element={<StudentManager />} />
          <Route path="/admin/teacher" element={<TeacherManager />} />
          <Route path="/admin/teacher-info" element={<InfoTeacher />} />
          <Route path="/admin/courses" element={<CoursesManager />} />
          <Route path="/admin/courses-info" element={<InfoCourses />} />
          <Route path="/admin/add-teacher" element={<AddTeacher />} />



        </Routes>
      </Router>
    </div>
  );
}

export default App;
