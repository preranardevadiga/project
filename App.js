import React from "react";
import { Route, Routes } from "react-router-dom";
import FacultyDashboard from "./components/FacultyDashboard";
import InternshipPortal from "./components/InternshipPortal"; // import the main page
import StudentDashboard from "./components/StudentDashBoard";
import FacultyLogin from "./pages/FacultyLogin";
import FacultySignup from "./pages/FacultySignup";
import StudentLogin from "./pages/StudentLogin";
import StudentSignup from "./pages/StudentSignup";
function App() {
  return (
    <Routes>
      <Route path="/" element={<InternshipPortal />} />{" "}
      {/* main landing page */}
      <Route path="/student-signup" element={<StudentSignup />} />
      <Route path="/student-login" element={<StudentLogin />} />
      <Route path="/faculty-signup" element={<FacultySignup />} />
      <Route path="/faculty-login" element={<FacultyLogin />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />
      <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
    </Routes>
  );
}

export default App;
