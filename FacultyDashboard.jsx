import { AnimatePresence, motion } from "framer-motion";
import { LogOut, Menu, SendHorizonal, User } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // for redirection

const mockFaculty = {
  name: "Dr. Kavita Sharma",
  email: "kavita.sharma@college.edu",
  department: "Computer Science",
  phone: "9876543210",
  facultyId: "FAC12345",
};

const mockStudents = [
  {
    id: 1,
    name: "Alice Johnson",
    usn: "CS21A001",
    section: "A",
    branch: "Computer Science",
    joiningYear: 2021,
    graduationYear: 2025,
    internship: {
      company: "TechCorp",
      role: "Frontend Intern",
      duration: "2 months",
      startDate: "2024-06-01",
      endDate: "2024-08-01",
    },
  },
  {
    id: 2,
    name: "Rahul Mehta",
    usn: "EE20A012",
    section: "B",
    branch: "Electrical Engineering",
    joiningYear: 2020,
    graduationYear: 2024,
    internship: {
      company: "PowerGrid Ltd.",
      role: "Electrical Intern",
      duration: "3 months",
      startDate: "2024-05-01",
      endDate: "2024-08-01",
    },
  },
  // add more mock students if needed
];

export default function FacultyDashboard() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [branchFilter, setBranchFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const filteredStudents = mockStudents.filter((student) => {
    const matchesSearch = student.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesBranch = branchFilter ? student.branch === branchFilter : true;
    const matchesYear = yearFilter
      ? student.joiningYear.toString() === yearFilter
      : true;
    const matchesCompany = companyFilter
      ? student.internship.company === companyFilter
      : true;

    return matchesSearch && matchesBranch && matchesYear && matchesCompany;
  });

  const branches = [
    "Computer Science",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Information Technology",
    "Electronics & Communication",
  ];
  const years = [2019, 2020, 2021, 2022, 2023, 2024];
  const companies = [
    "TechCorp",
    "PowerGrid Ltd.",
    "Larsen & Toubro",
    "Infosys",
    "L&T Constructions",
    "Qualcomm",
    "Google",
  ];

  const handleLogout = () => {
    // Optionally clear session/local storage here
    navigate("/facultylogin"); // change this path to match your actual login route
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <motion.div
        className={`bg-white border-r shadow-md transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-16"
        }`}
        onMouseEnter={() => setIsSidebarOpen(true)}
        onMouseLeave={() => setIsSidebarOpen(false)}
      >
        <div
          className="p-4 border-b flex items-center gap-2 cursor-pointer hover:bg-blue-50"
          onClick={() => setActiveSection("")}
        >
          <Menu className="w-6 h-6" />
          {isSidebarOpen && (
            <span className="text-lg font-semibold text-blue-600">
              Dashboard
            </span>
          )}
        </div>

        <ul className="p-2 space-y-2">
          <li
            onClick={() => setActiveSection("profile")}
            className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100"
          >
            <User className="w-5 h-5" />
            {isSidebarOpen && <span>My Profile</span>}
          </li>
          <li
            onClick={() => setActiveSection("message")}
            className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100"
          >
            <SendHorizonal className="w-5 h-5" />
            {isSidebarOpen && <span>Send Message</span>}
          </li>
          <li
            onClick={handleLogout}
            className="flex items-center gap-2 p-2 cursor-pointer hover:bg-red-100 text-red-600"
          >
            <LogOut className="w-5 h-5" />
            {isSidebarOpen && <span>Logout</span>}
          </li>
        </ul>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-50">
        <AnimatePresence>
          {activeSection === "profile" && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              className="bg-white p-6 rounded-lg shadow"
            >
              <h2 className="text-2xl font-bold mb-4">Faculty Profile</h2>
              <p>
                <strong>Name:</strong> {mockFaculty.name}
              </p>
              <p>
                <strong>Email:</strong> {mockFaculty.email}
              </p>
              <p>
                <strong>Phone:</strong> {mockFaculty.phone}
              </p>
              <p>
                <strong>Department:</strong> {mockFaculty.department}
              </p>
              <p>
                <strong>Faculty ID:</strong> {mockFaculty.facultyId}
              </p>
            </motion.div>
          )}

          {activeSection === "message" && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              className="bg-white p-6 rounded-lg shadow"
            >
              <h2 className="text-2xl font-bold mb-4">Send Message</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Message sent to all students!");
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block font-medium">Subject</label>
                  <input
                    type="text"
                    className="w-full mt-1 px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium">Message</label>
                  <textarea
                    className="w-full mt-1 px-3 py-2 border rounded-md"
                    rows="5"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Send to All Students
                </button>
              </form>
            </motion.div>
          )}

          {activeSection === "" && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
                Student Internship Details
              </h1>

              {/* Filters */}
              <div className="flex flex-wrap gap-4 mb-6 justify-center">
                <input
                  type="text"
                  placeholder="Search by student name"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="px-4 py-2 border rounded-md shadow-sm"
                />
                <select
                  value={branchFilter}
                  onChange={(e) => setBranchFilter(e.target.value)}
                  className="px-4 py-2 border rounded-md shadow-sm"
                >
                  <option value="">All Branches</option>
                  {branches.map((branch) => (
                    <option key={branch} value={branch}>
                      {branch}
                    </option>
                  ))}
                </select>
                <select
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                  className="px-4 py-2 border rounded-md shadow-sm"
                >
                  <option value="">All Years</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <select
                  value={companyFilter}
                  onChange={(e) => setCompanyFilter(e.target.value)}
                  className="px-4 py-2 border rounded-md shadow-sm"
                >
                  <option value="">All Companies</option>
                  {companies.map((company) => (
                    <option key={company} value={company}>
                      {company}
                    </option>
                  ))}
                </select>
              </div>

              {/* Internship Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <motion.div
                      key={student.id}
                      className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
                      whileHover={{ scale: 1.02 }}
                    >
                      <h2 className="text-xl font-semibold mb-2 text-gray-800">
                        {student.name}
                      </h2>
                      <p>
                        <strong>USN:</strong> {student.usn}
                      </p>
                      <p>
                        <strong>Section:</strong> {student.section}
                      </p>
                      <p>
                        <strong>Branch:</strong> {student.branch}
                      </p>
                      <p>
                        <strong>Joining Year:</strong> {student.joiningYear}
                      </p>
                      <p>
                        <strong>Graduation Year:</strong>{" "}
                        {student.graduationYear}
                      </p>
                      <div className="mt-4">
                        <h3 className="font-semibold text-gray-700">
                          Internship Details:
                        </h3>
                        <p>
                          <strong>Company:</strong> {student.internship.company}
                        </p>
                        <p>
                          <strong>Role:</strong> {student.internship.role}
                        </p>
                        <p>
                          <strong>Duration:</strong>{" "}
                          {student.internship.duration}
                        </p>
                        <p>
                          <strong>Start Date:</strong>{" "}
                          {student.internship.startDate}
                        </p>
                        <p>
                          <strong>End Date:</strong>{" "}
                          {student.internship.endDate}
                        </p>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <p className="col-span-full text-center text-gray-600">
                    No matching records found.
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
